<template>
  <div class="summary d-flex justify-content-center">
    <b-card style="max-width: 100rem;" title="Overview">
      <b-card-text>
        <b-list-group>
          <b-list-group-item class="count-after-due-date">
            No. of projects with due date in the past
            <b-badge variant="primary" pill>{{ summary.countAfterDueDate }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="prominent-language">
            Most prominent source language:
            <b-badge variant="primary" pill>{{ summary.prominentLanguage }}</b-badge>
          </b-list-group-item>
          <b-list-group-item class="count-by-status">
            No. of projects by the status:
            <div class="d-inline" v-for="(status, index) in summary.countByStatus"
                 :key="index">
              {{ index }}:
              <b-badge variant="primary" pill>{{ status }}</b-badge>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

const props = {
  summary: {
    type: Object,
    required: true,
  },
};

const ProjectOverview = {
  props,
};

export default ProjectOverview;

</script>

<style scoped>
</style>
