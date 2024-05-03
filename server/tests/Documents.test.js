import request from "supertest";
import { app, server } from '../app.js';



describe('GET /api/documents', () => {
  test('should return an array of documents and status 200', async () => {
    const response = await request(app).get('/api/documents');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

  test('Post response should be an object and then return status 201', async() => {
      const response = await api.post('/api/documets').send({
         
      });

      expect(typeof response.body).toBe('object');
      expect(response.status).toBe(201);
  
  });



afterAll( async () => {
    server.close();
 })

