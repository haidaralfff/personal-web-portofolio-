/**
 * Controller untuk Project endpoints
 * Handles business logic untuk project operations
 */

import pool from "../db.js";
import { okResponse, createdResponse } from "../utils/response.js";
import { NotFoundError, DatabaseError, ValidationError } from "../utils/errorHandler.js";

/**
 * GET /api/projects
 * Ambil semua projects dengan optional filtering dan pagination
 */
export const getAllProjects = async (req, res, next) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = "SELECT * FROM projects";
    const params = [];
    let paramCount = 1;

    // Filter by status jika ada
    if (status) {
      const validStatus = ["Active", "Draft", "In Progress", "Completed"];
      if (!validStatus.includes(status)) {
        throw new ValidationError(`Status harus salah satu dari: ${validStatus.join(", ")}`);
      }
      query += ` WHERE status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    // Order by created_at descending
    query += " ORDER BY created_at DESC";

    // Pagination
    const limitNum = Math.min(parseInt(limit) || 50, 100); // Max 100 per page
    const offsetNum = Math.max(parseInt(offset) || 0, 0);
    
    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limitNum, offsetNum);

    // Get total count untuk pagination metadata
    let countQuery = "SELECT COUNT(*) FROM projects";
    const whereClause = params.length > 2 ? ` WHERE status = $1` : "";
    const countParams = params.length > 2 ? [params[0]] : [];
    
    const countResult = await pool.query(countQuery + whereClause, countParams);
    const totalCount = parseInt(countResult.rows[0].count);

    const result = await pool.query(query, params);

    okResponse(res, 
      {
        projects: result.rows,
        pagination: {
          total: totalCount,
          limit: limitNum,
          offset: offsetNum,
          hasMore: offsetNum + limitNum < totalCount
        }
      },
      "Projects berhasil diambil"
    );
  } catch (error) {
    next(error instanceof ValidationError ? error : new DatabaseError(error.message));
  }
};

/**
 * GET /api/projects/:id
 * Ambil project berdasarkan ID
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Double check ID validation
    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError("Project ID harus berupa angka positif");
    }

    const result = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError("Project tidak ditemukan");
    }

    okResponse(res, result.rows[0], "Project berhasil diambil");
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/projects
 * Buat project baru
 * Body harus sudah di-validate oleh validateProject middleware
 */
export const createProject = async (req, res, next) => {
  try {
    const { title, tech, status = "Draft", image } = req.body;

    // Final validation - middleware sudah sanitasi tapi kita double check
    if (!title || !tech || typeof title !== "string" || typeof tech !== "string") {
      throw new ValidationError("Title dan tech harus valid");
    }

    // Check apakah title sudah ada (unique constraint di DB, tapi cek dulu)
    const existingProject = await pool.query(
      "SELECT id FROM projects WHERE LOWER(trim(title)) = LOWER(trim($1))",
      [title]
    );

    if (existingProject.rows.length > 0) {
      throw new ValidationError("Project dengan title ini sudah ada");
    }

    // Insert dengan timestamps
    const result = await pool.query(
      `INSERT INTO projects (title, tech, status, image_url, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
       RETURNING *`,
      [title, tech, status, image || null]
    );

    createdResponse(res, result.rows[0], "Project berhasil dibuat");
  } catch (error) {
    next(error instanceof ValidationError ? error : new DatabaseError(error.message));
  }
};

/**
 * PUT /api/projects/:id
 * Update project berdasarkan ID
 * Body harus sudah di-validate oleh validateProject middleware
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, tech, status = "Draft", image } = req.body;

    // Validation
    if (!title || !tech) {
      throw new ValidationError("Title dan tech harus diisi");
    }

    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError("Project ID tidak valid");
    }

    // Check apakah project exists
    const existsResult = await pool.query(
      "SELECT id FROM projects WHERE id = $1",
      [id]
    );

    if (existsResult.rows.length === 0) {
      throw new NotFoundError("Project tidak ditemukan");
    }

    // Check apakah title unique (untuk project lain)
    const duplicateTitle = await pool.query(
      "SELECT id FROM projects WHERE LOWER(trim(title)) = LOWER(trim($1)) AND id != $2",
      [title, id]
    );

    if (duplicateTitle.rows.length > 0) {
      throw new ValidationError("Project dengan title ini sudah ada");
    }

    // Update dengan timestamps
    const result = await pool.query(
      `UPDATE projects 
       SET title = $1, tech = $2, status = $3, image_url = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $5 
       RETURNING *`,
      [title, tech, status, image || null, id]
    );

    okResponse(res, result.rows[0], "Project berhasil diupdate");
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/projects/:id
 * Hapus project berdasarkan ID
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError("Project ID tidak valid");
    }

    // Delete project
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError("Project tidak ditemukan");
    }

    okResponse(res, 
      {
        id: result.rows[0].id,
        message: `Project "${result.rows[0].title}" berhasil dihapus`
      },
      "Project berhasil dihapus"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/projects/stats
 * Ambil statistik projects
 */
export const getProjectStats = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_projects,
        COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_projects,
        COUNT(CASE WHEN status = 'Draft' THEN 1 END) as draft_projects,
        COUNT(CASE WHEN status = 'In Progress' THEN 1 END) as in_progress_projects,
        COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed_projects
      FROM projects
    `);

    okResponse(res, result.rows[0], "Statistik projects berhasil diambil");
  } catch (error) {
    next(new DatabaseError(error.message));
  }
};
