import Vue from 'vue';
import {getProjectList, getSummary} from '@/services/ProjectService'

const initialState = {
    projectList: [],
    summary: {
        countByStatus: {
            DELIVERED: Number,
        },
        countAfterDueDate: Number,
        prominentLanguage: String,
    }
};

const mutations = {
    setProjectList(state, project) {
        Vue.set(state, 'projectList', project);
    },
    setSummary(state, summary) {
        Vue.set(state, 'summary', summary);
    },
};

const getters = {
    projectList: ({projectList}) => projectList,
    summary: ({summary}) => summary,
};

const actions = {
    async updateProjectStatistics({commit}, projects) {
        commit('setSummary', await getSummary(projects))
    },

    async updateProjectList({commit, dispatch}) {
        const projects = await getProjectList();
        await commit('setProjectList', projects.map(project => {
            return {
                id: project.id,
                name: project.name,
                status: project.status,
                sourceLanguage: project.sourceLanguage,
                dateDue: new Date(project.dateDue),
                targetLanguages:
                    (typeof project.targetLanguages !== 'undefined' &&
                        project.targetLanguages instanceof Array &&
                        project.targetLanguages?.length)
                        ? project.targetLanguages.join(',') : ""
            }
        }));
        dispatch('updateProjectStatistics', projects)
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