const request = require('supertest');
const express = require('express');
const path = require('path')
const fs = require('fs')
const appointmentsData = require('../src/appointments');

const app = express();
app.use(express.json());
app.use('/api/appointments', appointmentsData);
const appointmentsFilePath = path.join(__dirname, '../appointment.json');

describe('Appointment Get ALL API', () => {

    it("should return All the appointments", async () => {
        const { body, statusCode } = await request(app).get('/api/appointments');
        expect(body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                appointmentTime: expect.any(String),
                appointmentDate: expect.any(String),
                isActive: expect.any(Boolean),
                appointmentId: expect.any(String),
                appointmentStatus: expect.any(String)
            })
        ]));

        expect(statusCode).toBe(200);
    });

    // it("should return Empty Array if there are no appointments", async () => {

    //     const { body, statusCode } = await request(app).get('/api/appointments');

    //     expect(body).toEqual([]).expect(statusCode).toBe(200);
    // });

    it("should return All the pending appointments", async () => {

        const { body, statusCode } = await request(app).get('/api/appointments');

        const pendingAppointments = body.filter(appointment => appointment.appointmentStatus === "pending");

        expect(pendingAppointments).toEqual(expect.arrayContaining([
            expect.objectContaining({
                appointmentTime: expect.any(String),
                appointmentDate: expect.any(String),
                isActive: expect.any(Boolean),
                appointmentId: expect.any(String),
                appointmentStatus: "pending"
            })
        ]));

        expect(statusCode).toBe(200);
    });

    it("should return All the approved appointments", async () => {

        const { body, statusCode } = await request(app).get('/api/appointments');

        const approvedAppointments = body.filter(appointment => appointment.appointmentStatus === "approved");

        expect(approvedAppointments).toEqual(expect.arrayContaining([
            expect.objectContaining({
                appointmentTime: expect.any(String),
                appointmentDate: expect.any(String),
                isActive: expect.any(Boolean),
                appointmentId: expect.any(String),
                appointmentStatus: "approved"
            })
        ]));

        expect(statusCode).toBe(200);
    });
});


describe('Appointment Create API', () => {
    const testAppointmentData = {
        appointmentTime: '09:30 AM',
        appointmentDate: '2024-01-24T00:00:00.000Z',
        appointmentStatus: 'pending',
        isActive: true,
    };

    it('should create a new appointment', async () => {
        const { body, statusCode } = await request(app)
            .post('/api/appointments')
            .send(testAppointmentData); // Use the predefined testAppointmentData

        console.log(body);
        expect(statusCode).toBe(201);

        // Check if the response body contains the expected properties
        expect(body).toEqual(expect.objectContaining(testAppointmentData));


        const appointmentsData = JSON.parse(fs.readFileSync(appointmentsFilePath, 'utf-8'));
    });
});
