import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { 
        path: '/', 
        name: 'calculator',
        component: () => import('../modules/calculator/pages/cuota-calculator.vue'),
        children: [
            {
                path: '',
                redirect: 'recuperacion'
                // name: 'bienvenida',
                // component: () => import('../modules/calculator/components/bienvenida.vue'),
            },
            {
                path: 'recuperacion',
                name: 'recuperacion',
                component: () => import('../modules/calculator/components/recuperacion.vue'),
            },
            {
                path: 'disponibilidad',
                name: 'disponibilidad',
                component: () => import('../modules/calculator/components/disponibilidad.vue'),
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router
