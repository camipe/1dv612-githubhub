const mongoose = require('mongoose');
const axios = require('axios');
const notification = require('../../handlers/notification');

const Sub = mongoose.model('Sub');

exports.subscribe = (req, res) => {
  req.body.forEach(async (organization) => {
    try {
      let subscription = await Sub.findOne({ organization: organization.name });
      if (!subscription) {
        subscription = new Sub({ organization: organization.name, subscribers: [] });
        if (organization.subscribe) {
          subscription.subscribers.push(req.user.email);
        }
        await subscription.save();
      } else {
        if (organization.subscribed) {
          subscription.subscribers.push(req.user.email);
        } else {
          subscription.subscribers = subscription.subscribers.filter(email => email !== req.user.email);
        }
        await subscription.save();
      }

      // TODO: kolla om hook finns annars skapa hook
      
      const hook = await axios({
        url:`https://api.github.com/orgs/${ organization.name }/hooks`,
        headers: {'authorization': `Bearer ${ req.user.ghApiKey }`},
      });
      if ((Array.isArray(hook) || hook.data.length < 1)) {
        console.log('after-if')
        hookOptions = {
          name: 'web',
          config: {
            url: 'https://58c4efca.ngrok.io/hook',
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

exports.notify = async (req, res) => {
  console.log(req.body);
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
