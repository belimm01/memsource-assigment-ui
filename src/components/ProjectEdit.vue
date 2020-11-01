<template>
  <div>
    <Header/>
    <router-link class="d-flex justify-content-xl-start" to="/">
      <b-button variant="info">
        Back
        <b-icon icon="backspace"></b-icon>
      </b-button>
    </router-link>
    <div v-if="project" class="d-flex justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
            id="input-group-1"
            label="Project name:"
            label-for="input-1">
          <b-form-input
              id="input-1"
              v-model="project.name"
              required
              placeholder="Enter name">
          </b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-3"
            label="Project source language:"
            label-for="input-3">
          <b-form-input
              id="input-3"
              v-model="project.sourceLanguage"
              required
              placeholder="Enter source language">
          </b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-4"
            label="Project target languages:"
            label-for="input-4"
            description="Enter target language by coma: ru, en.">
          <b-form-input
              id="input-4"
              v-model="project.targetLanguages"
              required
              placeholder="Enter target language">
          </b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-5"
            label="Project date due:"
            label-for="input-5">
          <b-form-datepicker
              id="input-5"
              required
              v-model="project.dateDue"
              class="mb-2">
          </b-form-datepicker>
        </b-form-group>

        <b-button class="m-3" type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
    <div v-else>Something going wrong…</div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {updateProject, addProject, isDueDateValid, getFormattedTargetLanguages} from "@/services/ProjectService";
import {mapGetters} from "vuex";
import * as _ from 'lodash';

const methods = {
  getUTCDate() {
    return new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
  },
  onSubmit(evt) {
    evt.preventDefault()
    const currentDate = this.getUTCDate();
    this.project.dateDue = new Date(new Date(this.project.dateDue).toString().split('GMT')[0] + ' UTC').toISOString()
    this.project.dateUpdated = (this.project.dateUpdated) ? this.project.dateUpdated : currentDate;
    this.project.targetLanguages = getFormattedTargetLanguages(this.project);
    if (this.id == null) {
      this.project.status = 'NEW';
      this.project.dateCreated = (this.project.dateCreated) ? this.project.dateCreated : currentDate;
      if (this.project.dateDue && isDueDateValid(this.project.dateDue)) {
        addProject(this.project);
        this.$router.push("/");
      }
    } else {
      updateProject(this.project);
      this.$router.push("/");
    }
  },
  onReset(evt) {
    evt.preventDefault()
    // Reset our form values
    this.project.name = '';
    this.project.status = '';
    this.project.sourceLanguage = '';
    this.project.dateDue = '';
    this.project.targetLanguages = '';

    // Trick to reset/clear native browser form validation state
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }
}

const data = () => {
  return {
    show: true
  }
};

const props = {
  propsProject: {
    type: Object,
    require: true,
  },
};

const components = {Header};

const computed = {
  project: {
    get: function () {
      return _.cloneDeep(this.propsProject);
    },
    set: function (newProject) {
      this.$emit('propsProject', newProject)
    }
  },
  ...mapGetters('ProjectModule', ['projectList']),
}

const ProjectEdit = {
  methods,
  components,
  computed,
  data,
  props,
};

export default ProjectEdit;

</script>

<style scoped>
</style>
