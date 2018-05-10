const mongoose = require('mongoose');
const notification = require('../../handlers/notification');

const Sub = mongoose.model('Sub');

exports.subscribe = (req, res) => {
  req.body.forEach(async (organization) => {
    console.log(organization);
    try {
      let subscription = await Sub.findOne({ organization: organization.name });
      if (!subscription) {
        subscription = new Sub({ organization: organization.name, subscribers: [] });
        if (organization.subscribe) {
          subscription.subscribers.push(req.user.email);
        }
        await subscription.save();
      } else {
        if (organization.subscribe) {
          subscription.subscribers.push(req.user.email);
        } else {
          subscription.subscribers = subscription.subscribers.filter(email => email !== req.user.email);
        }
        await subscription.save();
      }
    } catch (error) {
      console.log(error);
    }
    // TODO: kolla om hook finns annars skapa hook
  });
  res.sendStatus(204);
};

exports.notify = async (req, res) => {
  if (req.body.action === 'opened') {
    try {
      const subscription = await Sub.findOne({ organization: req.body.organization.login });
      const mailOptions = {
        subscribers: subscription.subscribers,
        organization: req.body.organization,
        repository: req.body.repository,
        issue: req.body.issue,
      };

      notification.send(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
  res.sendStatus(204);
};
