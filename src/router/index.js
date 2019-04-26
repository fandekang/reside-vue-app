import Vue from "vue";
import Router from "vue-router";

// import Home from '@/components/layout/case/home'
import handleWrite from '@/components/layout/case/handle/write'
import handleView from '@/components/layout/case/handle/view'

import writeApply from '@/components/layout/case/handle/write/application-form'
import writeMaterial from '@/components/layout/case/handle/write/receipt-material'

import viewApply from '@/components/layout/case/handle/view/application-form'
import viewMaterial from '@/components/layout/case/handle/view/receipt-material'
import viewMealCard from '@/components/layout/case/handle/view/meal-card-form'

import createCase from '@/components/layout/case/create-case/create-case'
import dynamicQuery from '@/components/layout/case/dynamic-query/dynamic-query'

// import createCaseStep from '@/components/layout/case/create-case/create-case'

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
            redirect: '/writeApply',
            component: handleWrite,
            children: [
                {
                    path: '/writeApply',
                    name: 'writeApply',
                    component: writeApply
                },
                {
                    path: '/writeMaterial',
                    name: 'writeMaterial',
                    component: writeMaterial
                }
            ]
        },
        {
            path: '/handleView',
            name: 'handleView',
            redirect: '/viewApply',
            component: handleView,
            children: [
                {
                    path: '/viewApply',
                    name: 'viewApply',
                    component: viewApply
                },
                {
                    path: '/viewMaterial',
                    name: 'viewMaterial',
                    component: viewMaterial
                },
                {
                    path: '/viewMealCard',
                    name: 'viewMealCard',
                    component: viewMealCard
                }
            ]
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
        },
        {
            path: '/dynamic-query',
            name: 'dynamic-query',
            component: dynamicQuery
        }
    ]
});
