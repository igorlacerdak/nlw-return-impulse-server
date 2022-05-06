import express from 'express'
import { NodemailerMailSend } from './jobs/nodemailer/nodemailerMailSend';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbackRepository';
import { SubmitFeedback } from './services/submitFeedback';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot} = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository
    const nodemailerMailSend = new NodemailerMailSend()
    const submitFeedback = new SubmitFeedback(
        prismaFeedbackRepository, 
        nodemailerMailSend
    ) 

    await submitFeedback.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()
}) 