const mongoose = require('mongoose');
const axios = require('axios');
const notification = require('../../handlers/notification');

const Sub = mongoose.model('Sub');

exports.subscribe = (req, res) => {
  req.body.forEach(async (organization) => {
    try {
      // check if sub exists in db
      let subscription = await Sub.findOne({ organization: organization.name });
      if (!subscription) {
        // create a new if it doesn't exist
        subscription = new Sub({ organization: organization.name, subscribers: [] });
        // subscribe user if requested
        if (organization.subscribed) {
          subscription.subscribers.push(req.user.email);
        }
        await subscription.save();
      } else {

        if ((organization.subscribed && !subscription.subscribers.includes(req.user.email))) {
          //subscribe user if .subscribed is true
          subscription.subscribers.push(req.user.email);
        } else if (!organization.subscribed) {
          //unsubscribe user if .subscribed is not true
          subscription.subscribers = subscription.subscribers.filter(email => email !== req.user.email);
        }
        await subscription.save();
      }
      // setup hook if it doesn't exist
      const hook = await axios({
        url:`https://api.github.com/orgs/${ organization.name }/hooks`,
        headers: {'authorization': `Bearer ${ req.user.ghApiKey }`},
      });

      if ((Array.isArray(hook) || hook.data.length < 1)) {
        hookOptions = {
          name: 'web',
          config: {
            url: `${process.env.HOST_URI}/api/hook`,
            content_type: 'json',
          },
          events: ['issues'],
        }
        const hook = await axios({
          method: 'POST',
          url:`https://api.github.com/orgs/${ organization.name }/hooks`,
          headers: {'authorization': `Bearer ${ req.user.ghApiKey }`},  
          data: hookOptions,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  });
  res.sendStatus(204);
};

// notifies all subscribed users when an organtization has an incoming hook
exports.notify = async (req, res) => {
  // only triggers on new/opened issues
  if (req.body.action === 'opened') {
    try {
      const subscription = await Sub.findOne({ organization: req.body.organization.login });
      const mailOptions = {
        subscribers: subscription.subscribers,
        organization: req.body.organization,
        repository: req.body.repository,
        issue: req.body.issue,
      };

      if (subscription.subscribers.length < 1) {
        console.log("Körs ändå");
        notification.send(mailOptions);
      }
    } catch (error) {
      console.log("logged notify catch");
      console.log(error);
    }
  }
  res.sendStatus(204);
};
