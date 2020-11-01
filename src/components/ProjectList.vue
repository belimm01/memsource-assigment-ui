<template>
  <div>
    <Header/>
    <ProjectOverview :summary="summary"/>
    <div class="d-inline-block justify-content-center p-2">
      <router-link :to="{ name: 'create', params: {propsProject: {}} }">
        <b-button variant="outline-info"
                  class="mb-2 m-1">
          Add
          <b-icon icon="plus" aria-hidden="true"></b-icon>
        </b-button>
      </router-link>
      Sort:
      <b-button variant="outline-info" class="mb-2 m-1"
                v-for="(key, index) in projectSortKeys"
                :key="index"
                @click="setSortKey(key)"
                :class="{active: currentSortKey === key}">
        {{ key }}
      </b-button>
      <b-form-input size="sm"
                    v-model="inputText"
                    placeholder="Enter name or status">
      </b-form-input>
    </div>
    <div v-if="projectList.length">
      <div class="sort-orders d-flex justify-content-center p-2 bd-highlight">
        <b-list-group>
          <b-list-group-item
              v-for="(project, index) in filteredProjects"
              :key="index">
            <Project :project="project"/>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div v-else>Loading your projects …</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Project from '@/components/Project';
import ProjectOverview from '@/components/ProjectOverview';
import Header from './Header';

const data = () => {
  return {
    inputText: "",
    currentSortKey: null,
    projectSortKeys: ["Id", "Name", "Status", "DueDate"]
  }
};

const computed = {
  ...mapGetters('ProjectModule', ['projectList', 'summary']),
  sortById: function () {
    return this.projectList.sort((a, b) => a.id - b.id);
  },
  sortAlphabetically: function () {
    return this.projectList.sort((a, b) => a.name.localeCompare(b.name))
  },
  sortByDateDue: function () {
    return this.projectList.sort((a, b) => new Date(b.dateDue) - new Date(a.dateDue));
  },
  sortedProjects: function () {
    if (!this.currentSortKey) return this.projectList
    if (this.currentSortKey === "Id") return this.sortById
    if (this.currentSortKey === "Name") return this.sortAlphabetically
    if (this.currentSortKey === "Status") return this.sortAlphabetically
    if (this.currentSortKey === "DueDate") return this.sortByDateDue
  },
  filteredProjects: function () {
    if (!this.inputText) return this.sortedProjects
    if (this.inputText) return this.sortedProjects.filter(obj => obj.name.toLowerCase().includes(this.inputText.toLowerCase()) || obj.status.toLowerCase().includes(this.inputText.toLowerCase()))
  }
};

const watch = {
  currentSortKey: function (val) {
    this.currentSortKey = val;
  },
  inputText: function (val) {
    this.inputText = val;
  }
};

const methods = {
  ...mapActions('ProjectModule', ['updateProjectList']),
  setSortKey(key) {
    this.currentSortKey = key
  },
};

const created = function () {
  this.updateProjectList();
};

const ProjectList = {
  components: {Project, ProjectOverview, Header},
  created,
  data,
  watch,
  methods,
  computed,
};

export default ProjectList;

</script>

<style scoped>
</style>
