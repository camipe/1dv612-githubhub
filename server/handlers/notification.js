const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// send an email notifying user about a new issue
exports.send = (options) => {
  const html = `<p>A new issue has been posted by: ${options.issue.user.login}</p>
    <h3>Issue Information</h3>
    <p>
      Title: ${options.issue.title}<br/>
      Organization: ${options.organization.login}<br/>
      Repository: ${options.repository.name}<br/>
    </p>`;

  const text = `A new issue has been posted by: ${options.issue.user.login}
Issue Information:
Title: ${options.issue.title}
Organization: ${options.organization.login}
Repository: ${options.repository.name}`;

  const mailOptions = {
    from: 'Micael Persson <noreply@micaelpersson.com>',
    to: options.subscribers,
    subject: `New issue in organization ${options.organization.login}`,
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
