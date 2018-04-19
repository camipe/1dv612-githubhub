const mongoose = require('mongoose');
const notification = require('../../handlers/notification');

const Sub = mongoose.model('Sub');


exports.subscribe = (req, res) => {
  req.body.subs.forEach(async (sub) => {
    try {
      let subscription = await Sub.findOne({ organisation: sub.organisation });
      if (!subscription) {
        subscription = new Sub({ organisation: sub.organisation, subscribers: [] });
        if (sub.subscribe) {
          subscription.subscribers.push(sub.email);
        }
        await subscription.save();
      } else {
        if (sub.subscribe) {
          subscription.subscribers.push(sub.email);
        } else {
          subscription.subscribers = subscription.subscribers.filter(email => email !== sub.email);
        }
        await subscription.save();
      }
    } catch (error) {
      console.log(error);
    }
    // TODO: kolla om hook finns annars skapa hook
  });
  res.json('subscription');
};

exports.notify = async (req, res) => {
  if (req.body.action === 'opened') {
    try {
      const subscription = await Sub.findOne({ organisation: req.body.organization.login });
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
