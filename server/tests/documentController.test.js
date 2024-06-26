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



describe('POST /api/document', () => {
  it('debería crear un nuevo documento', async () => {
    const newTemplate = {
      name: "Test Template 3",
      title: "Test Title 3",
      subtitle: "Test Subtitle 3",
      content: []
    };

    const res = await request(app)
      .post('/api/document')
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

it('should return an object with the newly created document', async () => {
  const nuevoDocumento = {
    titulo: 'My new document.',
    contenido: 'This is the content of my new document.'
  };
})



describe('DELETE /api/document/:id', () => {
  it('should delete an existing document."', async () => {
    
    const newTemplate = new Template({
      name: "Test Template",
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



describe('PUT /api/document/:id', () => {
  it('should update an existing document', async () => {
  
    const newTemplate = new Template({
      name: "Old Test Template",
      title: "Old Test Title",
      subtitle: "Old Test Subtitle",
      content: [
              ]
    });
    await newTemplate.save();

    
    const updatedData = {
      name: "Updated Test Template",
      title: "Updated Test Title",
      subtitle: "Updated Test Subtitle",
     
      content: [
       
      ]
    };

    const res = await request(app)
      .put(`/api/document/${newTemplate._id}`)
      .send(updatedData)
      .expect(200);

   
    const updatedTemplate = await Template.findById(newTemplate._id);
    expect(updatedTemplate).toBeTruthy();
    expect(updatedTemplate.name).toBe(updatedData.name);
    expect(updatedTemplate.title.content).toBe(updatedData.title.content);
    expect(updatedTemplate.subtitle).toBe(updatedData.subtitle);
    
  });
})
