<template>
  <div>
    <h1>Projects</h1>
    <b-button variant="outline-info" class="mb-2">
      Add<b-icon icon="plus" aria-hidden="true"></b-icon>
    </b-button>
    <b-button variant="outline-info" class="mb-2"
              v-for="(sortKey, index) in Object.keys(sortedProjects)"
              :key="index"
              :click="sortedProjects[sortKey]()"
              :class="{active: sortOrder === sortKey}">
      {{ sortKey }}
    </b-button>
    <div v-if="projectList.length">
      <div class="sort-orders">
        <b-list-group>
          <b-list-group-item
              v-for="(project, index) in sortedProjects[sortOrder]()"
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
    sortOrder: "id"
  }
};

const computed = {
  ...mapGetters('ProjectModule', ['projectList']),
  sortedProjects: function () {
    console.log(this.sortOrder)
    return {
      "id": () => {
        return this.projectList.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
      },
      "name": () => {
        return this.projectList.slice().sort()
      },
      "status": () => {
        return this.projectList;
      },
      "dateDue": () => {
        return this.projectList;
      },
    }
  }
};

const methods = {
  ...mapActions('ProjectModule', ['updateProjectList']),
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
