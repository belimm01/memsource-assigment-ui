<template>
  <div v-if="project.id"
       class="project">
    <div class="row">
      <div class="col">
        <div class="project-id">ID: {{ project.id }}</div>
      </div>
      <div class="col">
        <div class="project-name">Name: {{ project.name }}</div>
      </div>
      <div class="col">
        <div class="project-status">Source: {{ project.sourceLanguage }}</div>
      </div>
      <div class="col">
        <div class="project-status">Target: {{ project.targetLanguages }}</div>
      </div>
      <div class="col">
        <div class="project-status">Status: {{ project.status }}</div>
      </div>
      <div class="col">
        <div class="project-date-due">Date due: {{ project.dateDue.toLocaleString() }}</div>
      </div>
      <div class="col-auto">
        <router-link :to="{ name: 'edit', params: {propsProject: project, project: project} }">
          <b-button variant="info" class="mb-2">
            Edit
            <b-icon icon="gear-fill"></b-icon>
          </b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

const props = {
  project: {
    type: Object,
    required: true,
  },
};

const Project = {
  props,
};

export default Project;

</script>

<style scoped>
</style>
