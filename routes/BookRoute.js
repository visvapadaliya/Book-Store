const express = require('express');
const router = express.Router();
const bookController = require('../controller/BookController');

/**
 * @route   GET /getall
 * @desc    Get all books
 * @access  Public
 */
router.get('/getall', bookController.getAllBooks);

/**
 * @route   GET /getby/:id
 * @desc    Get a book by ID
 * @access  Public
 */
router.get('/getby/:id', bookController.getBookById);

/**
 * @route   POST /book
 * @desc    Create a new book
 * @access  Public
 */
router.post('/book', bookController.createBook);

/**
 * @route   PUT /bookupdate/:id
 * @desc    Update a book by ID
 * @access  Public
 */
router.put('/bookupdate/:id', bookController.updateBook);

/**
 * @route   DELETE /delete/:id
 * @desc    Delete a book by ID
 * @access  Public
 */
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;
