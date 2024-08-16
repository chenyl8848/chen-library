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
                path: '/category/document',
                component: () => import('@/pages/category/document.vue')
            },
            {
                path: '/category/article',
                component: () => import('@/pages/category/article.vue')
            },
            {
                path: '/document',
                component: () => import('@/pages/document/index.vue')
            },
            {
                path: '/upload',
                component: () => import('@/pages/upload/index.vue')
            },
            {
                path: '/article',
                component: () => import('@/pages/article/index.vue')
            },
            {
                path: '/post',
                component: () => import('@/pages/post/index.vue')
            },
            {
                path: '/joinvip',
                component: () => import('@/pages/article/index.vue')
            },
            {
                path: '/search',
                component: () => import('@/pages/search/index.vue')
            },
            {
                path: '/user',
                component: () => import('@/pages/user/index.vue')
            },

        ]
    },
    {
        path: '/admin',
        component: () => import("@/pages/admin/index.vue")
    }
]