import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hayatoclarke@gmail.com",
    pass: process.env.VITE_GMAIL_APP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main({ text }) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Hayato Portfolio" <hayatoclarke@gmail.com>', // sender address
    to: "hayatoclarke@gmail.com", // list of receivers
    subject: "Portfolio - Message From User", // Subject line
    text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
