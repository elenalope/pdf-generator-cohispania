import request from 'supertest';
import mongoose from 'mongoose';
import app, {server} from '../app'; 
import { Template } from '../models/Template';
import {connect} from '../database/db'; 

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await Template.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('GET /api', () => {
  it('debería devolver todos los documentos', async () => {
    const templates = [
      {
        name: "Test Template 1",
        title: "Test Title 1",
        subtitle: "Test Subtitle 1",
        content: []
      },
      {
        name: "Test Template 2",
        title: "Test Title 2",
        subtitle: "Test Subtitle 2",
        content: []
      }
    ];

    await Template.insertMany(templates);

    const res = await request(app)
      .get('/api')
      .expect(200);

    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe(templates[0].name);
    expect(res.body[1].name).toBe(templates[1].name);
  });

  it('debería devolver un array vacío si no hay documentos', async () => {
    const res = await request(app)
      .get('/api')
      .expect(200);

    expect(res.body.length).toBe(0);
  });
});
