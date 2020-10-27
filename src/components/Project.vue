<template>
  <div v-if="project.id"
       class="project">
    <form>
      <div class="row">
        <div class="col">
          <div class="project-id">Project ID: {{ project.id }}</div>
        </div>
        <div class="col">
          <div class="project-name">Project Name: {{ project.name }}</div>
        </div>
        <div class="col">
          <div class="project-status">Project Status: {{ project.status }}</div>
        </div>
        <div class="col">
          <div class="project-date-due">Project Date due: {{ project.dateDue }}</div>
        </div>
        <div class="col-auto">
          <b-button variant="info" class="mb-2">
            Edit
            <b-icon icon="gear-fill"></b-icon>
          </b-button>
        </div>
      </div>
    </form>
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
