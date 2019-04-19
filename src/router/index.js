import Vue from "vue";
import Router from "vue-router";

// import Home from '@/components/layout/case/home'
import handleWrite from '@/components/layout/case/handle/write'
import handleView from '@/components/layout/case/handle/view'

import createCase from '@/components/layout/case/create-case/create-case'

import selectBuyer from '@/components/layout/case/create-case/create-case-step/selectbuyer'
import selectSeller from '@/components/layout/case/create-case/create-case-step/selectseller'
import selectRoom from '@/components/layout/case/create-case/create-case-step/selectroom'
import createSummary from '@/components/layout/case/create-case/create-case-step/createsummary'

Vue.use(Router);

export default new Router({
    mode: 'history',
    // redirect: '/home',
    routes: [
        {
            path: '/handleWrite',
            name: 'handleWrite',
            component: handleWrite
        },
        {
            path: '/handleView',
            name: 'handleView',
            component: handleView   
        },
        {
            path: '/create-task',
            name: 'create-case',
            component: createCase,
            redirect: '/selectbuyer',
            children: [
                {
                    path: '/selectbuyer',
                    name: 'selectbuyer',
                    component: selectBuyer
                },
                {
                    path: '/selectseller',
                    name: 'selectseller',
                    component: selectSeller
                },
                {
                    path: '/selectroom',
                    name: 'selectroom',
                    component: selectRoom
                },
                {
                    path: '/createTask',
                    name: 'createTask',
                    component: createSummary
                }
            ]
        }
    ]
});
