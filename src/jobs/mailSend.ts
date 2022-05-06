export interface SendMailData {
    subject: string;
    body: string;
}

export interface MailSend{
    sendMail: (data: SendMailData) => Promise<void>;
}