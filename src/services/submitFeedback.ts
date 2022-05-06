import { MailSend } from "../jobs/mailSend";
import { FeedbackRepository } from "../repositories/feedbacksRepository"

interface SubmitFeedbackRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedback {

    constructor(
        private feedbacksRepository: FeedbackRepository,
        private mailSend: MailSend
    ){}

    async execute(request: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = request;


    if(!type){
        throw new Error('Type is required')
    }

    if(!comment){
        throw new Error('Comment is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
        throw new Error('invalid screenshot format')
    }

    await this.feedbacksRepository.create({
        type,
        comment,
        screenshot
    })

    await this.mailSend.sendMail({
        subject: 'Novo Feedback!',
        body: [
            `<div style="font-family: sans-serif; font-size: 16px;">`,
            `<p> Tipo de Feedback: ${type} </p>`,
            `<p> Comentario informado: ${comment} </p>`,
             screenshot ? `<img src="${screenshot}">` : null,
            `<div>`
        ].join('\n')
    })
 }
}