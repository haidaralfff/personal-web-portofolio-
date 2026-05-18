/**
 * Controller untuk Messages (Inbox) endpoints
 */

import pool from "../db.js";
import { createdResponse, okResponse } from "../utils/response.js";
import { NotFoundError, DatabaseError, ValidationError } from "../utils/errorHandler.js";

/**
 * POST /api/messages
 * Kirim pesan baru dari pengunjung (Public)
 */
export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      throw new ValidationError("Name, email, and message are required fields");
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError("Invalid email address format");
    }

    const result = await pool.query(
      `INSERT INTO messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, subject || "General Inquiry", message]
    );

    createdResponse(res, result.rows[0], "Message sent successfully");
  } catch (error) {
    next(error instanceof ValidationError ? error : new DatabaseError(error.message));
  }
};

/**
 * GET /api/messages
 * Ambil semua pesan masuk (Protected - Admin Only)
 */
export const getAllMessages = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const limitNum = Math.min(parseInt(limit) || 20, 100);
    const offsetNum = Math.max(parseInt(offset) || 0, 0);

    // Get total unread count as separate metadata
    const unreadCountResult = await pool.query(
      "SELECT COUNT(*) FROM messages WHERE is_read = FALSE"
    );
    const unreadCount = parseInt(unreadCountResult.rows[0].count);

    // Get total messages count
    const totalCountResult = await pool.query("SELECT COUNT(*) FROM messages");
    const totalCount = parseInt(totalCountResult.rows[0].count);

    // Get paginated messages (newest first)
    const result = await pool.query(
      `SELECT * FROM messages 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limitNum, offsetNum]
    );

    okResponse(res, {
      messages: result.rows,
      unreadCount,
      pagination: {
        total: totalCount,
        limit: limitNum,
        offset: offsetNum,
        hasMore: offsetNum + limitNum < totalCount
      }
    }, "Messages fetched successfully");
  } catch (error) {
    next(new DatabaseError(error.message));
  }
};

/**
 * PATCH /api/messages/:id/read
 * Tandai pesan sudah dibaca/belum dibaca (Protected - Admin Only)
 */
export const toggleMessageReadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    if (is_read === undefined || typeof is_read !== "boolean") {
      throw new ValidationError("is_read status (boolean) is required");
    }

    const result = await pool.query(
      `UPDATE messages 
       SET is_read = $1 
       WHERE id = $2 
       RETURNING *`,
      [is_read, id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError("Message not found");
    }

    okResponse(res, result.rows[0], `Message status updated to ${is_read ? 'read' : 'unread'}`);
  } catch (error) {
    next(error instanceof NotFoundError || error instanceof ValidationError ? error : new DatabaseError(error.message));
  }
};

/**
 * DELETE /api/messages/:id
 * Hapus pesan masuk (Protected - Admin Only)
 */
export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM messages WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError("Message not found");
    }

    okResponse(res, { id: result.rows[0].id }, "Message deleted successfully");
  } catch (error) {
    next(error instanceof NotFoundError ? error : new DatabaseError(error.message));
  }
};
