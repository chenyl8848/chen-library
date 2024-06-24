export default [
    {
        path: "/",
        component: () => import("@/pages/index.vue")
    },
    {
        path: '/admin',
        component: () => import("@/pages/admin/index.vue")
    }
]