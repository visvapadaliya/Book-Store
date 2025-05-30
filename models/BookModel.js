const db = require('../db');

const Book = {
  // Get all books from the database
  getAll: (callback) => {
    db.query('SELECT * FROM books', callback);
  },

  // Get a single book by its ID
  getById: (id, callback) => {
    db.query('SELECT * FROM books WHERE id = ?', [id], callback);
  },

  // Create a new book entry
  create: (data, callback) => {
    db.query('INSERT INTO books SET ?', data, callback);
  },

  // Update a book by its ID
  update: (id, data, callback) => {
    db.query('UPDATE books SET ? WHERE id = ?', [data, id], callback);
  },

  // Delete a book by its ID
  delete: (id, callback) => {
    db.query('DELETE FROM books WHERE id = ?', [id], callback);
  }
};

module.exports = Book;
