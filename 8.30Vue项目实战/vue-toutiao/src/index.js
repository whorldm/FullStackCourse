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

router.beforeEach((to, from, next) => {
    if(!/uid/.test(document.cookie) && to.path !== "/login") {
        next({
            path: "/login",
            query: { back: to.path }
        });
    } else {
        next();
    }
})

const vm = new Vue({
    el: "#app",
    router,
    render: h => {
        return h("router-view");
    }
});
