export default [
    {
        path: "/",
        // component: () => import("@/pages/index.vue")
        component: () => import("@/layout/front.vue"),
        children: [
            {
                path: '/',
                component: () => import('@/pages/index.vue')
            },
            {
                path: '/category',
                component: () => import('@/pages/category/index.vue')
            },
            {
                path: '/document',
                component: () => import('@/pages/document/index.vue')
            },
            {
                path: '/article',
                component: () => import('@/pages/article/index.vue')
            },
            {
                path: '/joinvip',
                component: () => import('@/pages/article/index.vue')
            },
            {
                path: '/search',
                component: () => import('@/pages/search/index.vue')
            },
        ]
    },
    {
        path: '/admin',
        component: () => import("@/pages/admin/index.vue")
    }
]