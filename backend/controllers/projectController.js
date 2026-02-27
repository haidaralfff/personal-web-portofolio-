/**
 * Controller untuk Project endpoints
 */

import pool from "../db.js";
import { okResponse, createdResponse } from "../utils/response.js";
import { NotFoundError, DatabaseError } from "../utils/errorHandler.js";

export const getAllProjects = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );

    okResponse(res, result.rows, "Projects berhasil diambil");
  } catch (error) {
    next(new DatabaseError(error.message));
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

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

export const createProject = async (req, res, next) => {
  try {
    const { title, tech, status, image } = req.body;

    const result = await pool.query(
      "INSERT INTO projects (title, tech, status, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, tech, status, image || null]
    );

    createdResponse(res, result.rows[0], "Project berhasil dibuat");
  } catch (error) {
    next(new DatabaseError(error.message));
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, tech, status, image } = req.body;

    const result = await pool.query(
      "UPDATE projects SET title = $1, tech = $2, status = $3, image = $4 WHERE id = $5 RETURNING *",
      [title, tech, status, image || null, id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError("Project tidak ditemukan");
    }

    okResponse(res, result.rows[0], "Project berhasil diupdate");
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError("Project tidak ditemukan");
    }

    okResponse(res, result.rows[0], "Project berhasil dihapus");
  } catch (error) {
    next(error);
  }
};
