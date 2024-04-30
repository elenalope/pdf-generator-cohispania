import request from "supertest";
// import { connect } from '../database/db.js';
// import  template  from "@babel/core";
import { app, server } from '../app.js';



describe('GET /api/documents', () => {
  test('should return an array of documents and status 200', async () => {
    const response = await request(app).get('/api/documents');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});


afterAll( async () => {
    server.close();
 })

