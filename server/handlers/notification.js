const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.send = (options) => {
  const html = '<h1>HELLO WORLD </h1>';
  const text = 'Hello world';

  const mailOptions = {
    from: 'Micael Persson <noreply@micaelpersson.com>',
    to: options.email,
    subject: options.subject,
    html,
    text,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    return console.log('Message sent: %s', info.messageId);
  });
};
