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
  it('should return all the title', async () => {
    const templates = [
      {
        title: { content: "Test Title 1", level: "h1" },
       
      },
      {
        title: { content: "Test Title 2", level: "h1" },
        
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

  it('should return an empty array if there are no title', async () => {
    const res = await request(app)
      .get('/api')
      .expect(200);

    expect(res.body.length).toBe(0);
  });
});

describe('POST /api/document/', () => {
    it('should create a new title', async () => {
      const newTemplate = {
        title: { content: "Test Title 3", level: "h1" },
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

  describe('DELETE /api/document/:id', () => {
    it('should delete an existing title."', async () => {
      
      const newTemplate = new Template({
        name: "Test Template",
      });
      await newTemplate.save();
  
      const res = await request(app)
        .delete(`/api/document/${newTemplate._id}`)
        .expect(200);
  
      const templateInDb = await Template.findById(newTemplate._id);
      expect(templateInDb).toBeNull();
    });
  });

  describe('PUT /api/document/:id', () => {
    it('should update an existing title', async () => {
    
      const newTemplate = new Template({
        
        title: { content: "Old Test Title", level: "h1" },
        content: [
                ]
      });
      await newTemplate.save();

      const updatedData = {
    
        title: { content: "Updated Test Title", level: "h1" },
        content: []
      };
  
      const res = await request(app)
        .put(`/api/document/${newTemplate._id}`)
        .send(updatedData)
        .expect(200);
  
     
      const updatedTemplate = await Template.findById(newTemplate._id);
      expect(updatedTemplate).toBeTruthy();
      expect(updatedTemplate.title.content).toBe(updatedData.title.content);
       });
  })
  