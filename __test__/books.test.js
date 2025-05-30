/* eslint-env jest */
const request = require('supertest');
const app = require('../app');

let createdBookId;
describe('Book API', () => {
  const bookData = {
    title: 'visva',
    book_category: 'Historical',
    star_rating: 3,
    price: '70',
    stock: 3,
    quantity: 101
  };

it('should create a new book', async () => {
    const res = await request(app).post('/book').send(bookData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdBookId = res.body.id;
  });

it('should return 400 when required fields are missing in create', async () => {
    const res = await request(app)
      .post('/book')
      .send({ title: '', book_category: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

it('should get all books', async () => {
    const res = await request(app).get('/getall');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

it('should get book by id', async () => {
    const res = await request(app).get(`/getby/${createdBookId}`);
    expect(res.statusCode).toBe(200);
  });

it('should update the book', async () => {
    const updatedData = { ...bookData, stock: 10 };
    const res = await request(app)
      .put(`/bookupdate/${createdBookId}`)
      .send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Book updated successfully');
  });

it('should return 404 when updating a non-existent book', async () => {
    const res = await request(app)
      .put(`/bookupdate/9999999`)
      .send(bookData);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Book not found');
  });

it('should delete the book', async () => {
    const res = await request(app).delete(`/delete/${createdBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Book deleted successfully');
  });

it('should return 404 for deleted book', async () => {
    const res = await request(app).get(`/getby/${createdBookId}`);
    expect(res.statusCode).toBe(404);
  });
});
