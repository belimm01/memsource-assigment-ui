import Vue from "vue";
import VueRouter from "vue-router";
import ProjectEdit from "@/components/ProjectEdit";
import ProjectList from '@/components/ProjectList.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: ProjectList, name: 'home'},
    {path: '/create', component: ProjectEdit, name: 'create', props: true},
    {path: '/edit/:project', component: ProjectEdit, name: 'edit', props: true},
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;