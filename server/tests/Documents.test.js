import { express } from "express";
import supertest from "supertest";
import { App } from "supertest/types";
import connect from "../database/db";
import Template from "../models/Template";

const api = request(App);

describe('GET', () => {
    test('GET ', async() => {
        const response = await request(api).get('/api/documents')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })    
});


