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
  
  it('should return an empty array if there are no sections', async () => {
    const res = await request(app)
      .get('/api')
      .expect(200);

    expect(res.body.length).toBe(0);
  });
});

    



  

