const Book = require('../models/BookModel');

/**
 * Get all books from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.getAllBooks = (req, res) => {
  Book.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

/**
 * Get a single book by its ID.
 *
 * @param {Object} req - Express request object. Requires `req.params.id`.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.getBookById = (req, res) => {
  const id = req.params.id;
  Book.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(results[0]);
  });
};

/**
 * Create a new book.
 *
 * @param {Object} req - Express request object. Requires book data in `req.body`.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.createBook = (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.book_category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    Book.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({ id: result.insertId, ...data });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Update an existing book by ID.
 *
 * @param {Object} req - Express request object. Requires book ID in `req.params.id` and updated data in `req.body`.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.updateBook = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Book.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    Book.update(id, data, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Book updated successfully' });
    });
  });
};

/**
 * Delete a book by ID.
 *
 * @param {Object} req - Express request object. Requires book ID in `req.params.id`.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.deleteBook = (req, res) => {
  const id = req.params.id;

  Book.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    Book.delete(id, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    });
  });
};
