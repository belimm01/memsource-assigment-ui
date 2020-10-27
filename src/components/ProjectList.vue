<template>
  <div>
    <h1>Projects</h1>
    <b-button variant="outline-info" class="mb-2">
      Add<b-icon icon="plus" aria-hidden="true"></b-icon>
    </b-button>
    <b-button variant="outline-info" class="mb-2"
              v-for="(key, index) in projectSortKeys"
              :key="index"
              :click="setSortKey(key)"
              :class="{active: sortKey === key}">
      {{ key }}
    </b-button>
    <div v-if="projectList.length">
      <div class="sort-orders">
        <b-list-group>
          <b-list-group-item
              v-for="(project, index) in sortedProjects"
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
import Project from './Project';

const data = () => {
  return {
    sortKey: null,
    name: 'XC',
    status: DELIVERED,
  }
};

const computed = {
  ...mapGetters('ProjectModule', ['projectList']),
  projectSortKeys: function () {
    return Object.keys(this.projectList)
  },

  sortById

  sortedProjects: function () {
    //default 
    if (!this.sortKey) return this.projectList
    if (this.sortKey === "id") return sortById
    if (this.sortKey === "name") return sortByName
    if (sortKey === "id") return sortById
    if (sortKey === "id") return sortById
  }
  filteredProjects: function () {
    this.sortedProjects.filter(p => p.name === this.name && p.status === this.status)
  }
};

const methods = {
  ...mapActions('ProjectModule', ['updateProjectList']),
  setSortKey(key) {
    this.sortKey = key
  }
};

const created = function () {
  this.updateProjectList();
};

const ProjectList = {
  components: {Project},
  created,
  data,
  methods,
  computed,
};

export default ProjectList;

</script>

<style scoped>
</style>
