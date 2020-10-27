import Vue from 'vue';
import {getProjectList} from '@/services/ProjectService'


const initialState = {
    projectList: [],
    summary: {
        countByStatus: {
            DELIVERED: 10,
        },
        countAfterDueDate: 9,
        prominentLanguage: 'JS',
    }
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
    updateProjectStatistics(projects) {
        /// project
    },

    async updateProjectList({commit, dispatch}) {
        const projects = await getProjectList();
        dispatch('updateProjectStatistics', projects)
        await commit('setProjectList', projects.map(p => {
            id: p.id,
            name: p.name,
            ///
        }));
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