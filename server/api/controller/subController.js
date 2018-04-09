const mongoose = require('mongoose');

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
    // kolla om hook finns
    // annars skapa hook
  });
  res.json('subscription');
};
