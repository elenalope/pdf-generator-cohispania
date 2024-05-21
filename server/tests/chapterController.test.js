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
  

  it('should return an empty array if there are no chapters', async () => {
    const res = await request(app)
      .get('/api')
      .expect(200);

    expect(res.body.length).toBe(0);
  });
});



describe('POST /api/document/:id', () => {
    it('should create a new chapter', async () => {
      const newTemplate = {
        title: "Test Title 3",
        subtitle: "Test Subtitle 3",
        content: []
      };
  
      const res = await request(app)
        .post('/api/document/')
        .send(newTemplate)
        .expect(201);
  
      expect(res.body.name).toBe(newTemplate.name);
      expect(res.body.title.content).toBe(newTemplate.title.content);
      expect(res.body.subtitle).toBe(newTemplate.subtitle);
  
      const templateInDb = await Template.findById(res.body._id);
      expect(templateInDb).not.toBeNull();
      expect(templateInDb.name).toBe(newTemplate.name);
    });
  })


 
  describe('DELETE /api/document/:id/chapter/:chapterId', () => {
    it('should delete an existing chapter."', async () => {
      
      const newTemplate = new Template({
       
        title: "Test Title",
        subtitle: "Test Subtitle",
        content: []
      });
      await newTemplate.save();
  
      const res = await request(app)
        .delete(`/api/document/${newTemplate._id}`)
        .expect(200);
  
      const templateInDb = await Template.findById(newTemplate._id);
      expect(templateInDb).toBeNull();
    });
  });
  
 
  
  

  
  