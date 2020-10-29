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
        await commit('setProjectList', projects.map(p => {
            return {
                id: p.id,
                name: p.name,
                status: p.status,
                sourceLanguage: p.sourceLanguage,
                dateDue: new Date(p.dateDue),
                targetLanguages:
                    (typeof p.targetLanguages != 'undefined' &&
                        p.targetLanguages instanceof Array &&
                        p.targetLanguages?.length)
                        ? p.targetLanguages.join(',') : ""
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