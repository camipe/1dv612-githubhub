<template>
  <b-col cols="3">
    <b-card 
      title="Settings"
      sub-title="Configure subscriptions">
      <b-form-group label="Organisations">
        <b-form-checkbox-group 
          v-model="selected"
          :options="organisations"
          stacked
          name="radiosStacked"/>
      </b-form-group>
    </b-card>
  </b-col>
</template>
<script>
export default {
  name: 'Settings',
  props: {
    organisations: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
  data() {
    return {
      selected: [],
    }
  }
}
</script>
