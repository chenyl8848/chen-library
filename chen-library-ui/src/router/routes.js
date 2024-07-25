export default [
    {
        path: "/",
        // component: () => import("@/pages/index.vue")
        component: () => import("@/layout/front.vue"),
        children: [
            {
                path: '/',
                component: () => import('@/pages/index.vue')
            }
        ]
    },
    {
        path: '/admin',
        component: () => import("@/pages/admin/index.vue")
    }
]