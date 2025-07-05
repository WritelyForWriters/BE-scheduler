import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

interface MailOptions {
  receivers: string[];
  subject: string;
  html: string;
}

export const send = async ({ receivers, ...rest }: MailOptions) => {
  transporter.sendMail({ to: receivers.join(", "), ...rest });
};

export default { send };
