/**
 * @file enter of file
 * @author caoyaqin
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./config";
import { functionalTool, reachBottomNotify } from "./utils";

Vue.use(VueRouter);
Vue.use(functionalTool);
Vue.use(reachBottomNotify);

const router = new VueRouter({
    routes
});

const vm = new Vue({
    el: "#app",
    router,
    render: h => {
        return h("router-view");
    }
});
