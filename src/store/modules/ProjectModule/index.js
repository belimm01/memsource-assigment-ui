import Vue from 'vue';
import {getProjectList} from '@/services/ProjectService'


const initialState = {
    projectList: [],
};

const mutations = {
    setProjectList(state, project) {
        Vue.set(state, 'projectList', project);
    },
};

const getters = {
    projectList: ({projectList}) => projectList,
};

const actions = {
    async updateProjectList({commit}) {
        const projectList = await getProjectList();
        await commit('setProjectList', projectList);
    },
};

const ProjectModule = {
    namespaced: true,
    state: initialState,
    mutations,
    getters,
    actions,
};

export {ProjectModule};