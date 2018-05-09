<template>
  <b-col cols="3">
    <b-card
      title="Settings"
      sub-title="Configure subscriptions">
      <b-form-group label="Organizations">
        <b-form-checkbox-group
          v-model="selected"
          stacked
          name="subscribe">
          <b-form-checkbox
            v-for="(org, index) in organizations"
            :key="index"
            :value="org.name">{{ org.name }}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button @click="updateSubscriptions">Save</b-button>
      <span>{{ saveMsg }}</span>
    </b-card>
  </b-col>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Settings',
  data() {
    return {
      organizations: [],
      selected: [],
      saveMsg: '',
    };
  },
  created() {
    try {
      axios.get('http://localhost:7777/organizations')
        .then((res) => {
          this.organizations = res.data;
          this.organizations.forEach((org) => {
            if (org.subscribed) {
              this.selected.push(org.name);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async updateSubscriptions() {
      // eslint-disable-next-line
      console.log(this.$auth.user);
      const postData = [];
      this.saveMsg = '';

      this.organizations.forEach((org) => {
        postData.push({
          name: org.name,
          subscribed: this.selected.includes(org.name),
          email: 'micael@gmail.com',
        });
      });
      try {
        const result = await axios.post('http://localhost:7777/subscribe', postData);
        this.saveMsg = 'Saved sucessfully';
        console.log(result);
      } catch (error) {
        this.saveMsg = 'Save failed';
        console.log(error);
      }
    },
  },
};
</script>
