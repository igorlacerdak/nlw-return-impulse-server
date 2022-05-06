import { SubmitFeedback } from "./submitFeedback"


const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedback(
    { create: createFeedbackSpy }, 
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64, teste.png',    
    })).resolves.not.toThrow();


    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

   })


   it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64, teste.png',    
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
                type: 'BUG',
                comment: '',
                screenshot: 'data:image/png;base64, teste.png',    
            })).rejects.toThrow();
        })


    it('should not be able to submit feedback with an screenshot format invalid ', async () => {
            await expect(submitFeedback.execute({
                    type: 'BUG',
                    comment: 'example comment',
                    screenshot: '123',    
            })).rejects.toThrow();
        })
})