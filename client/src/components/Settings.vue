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
  mounted() {
    this.getOrganizations();
  },
  methods: {
    async getOrganizations() {
      try {
        const res = await axios({
          url: `${process.env.API_URL}/organizations`,
          headers: { Authorization: `Bearer ${this.$auth.token}` },
        });
        this.organizations = res.data;
        // check if organization should be marked as subscribed
        this.organizations.forEach((org) => {
          if (org.subscribed) {
            this.selected.push(org.name);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async updateSubscriptions() {
      const postData = [];
      this.saveMsg = '';

      // format organization data
      this.organizations.forEach((org) => {
        postData.push({
          name: org.name,
          subscribed: this.selected.includes(org.name),
        });
      });
      // post data to api
      try {
        const result = await axios({
          method: 'POST',
          url: `${process.env.API_URL}/subscribe`,
          headers: { Authorization: `Bearer ${this.$auth.token}` },
          data: postData,
        });
        if (result.status !== 204) {
          throw new Error();
        }
        this.saveMsg = 'Saved sucessfully';
      } catch (error) {
        this.saveMsg = 'Save failed';
        console.log(error);
      }
    },
  },
};
</script>
