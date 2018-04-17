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
    // TOD: kolla om hook finns annars skapa hook
  });
  res.json('subscription');
};

exports.notify = async (req, res) => {
  console.log(req.body.action);
  if (req.body.action === 'opened') {
    console.log();
    try {
      const subscription = await Sub.findOne({ organisation: req.body.organization.login });
      const mailOptions = {
        email: subscription.subscribers,
        subject: 'New issue!',
      };

      notification.send(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  // hämta organisation från db

  // // maila relevant information till till alla emails i subscribe arrayen
  res.json({ Text: 'Success' });
};
