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
                path: '/publish',
                component: () => import('@/pages/publish/index.vue')
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
            {
                path: '/me',
                component: () => import('@/pages/me/index.vue'),
                redirect: '/me/dynamic',
                children: [
                    {
                        path: '/me/dynamic',
                        component: () => import('@/pages/me/dynamic.vue'),
                    },
                    {
                        path: '/me/document',
                        component: () => import('@/pages/me/document.vue'),
                    },
                    {
                        path: '/me/article',
                        component: () => import('@/pages/me/article.vue'),
                    },
                    {
                        path: '/me/favorite',
                        component: () => import('@/pages/me/favorite.vue'),
                    },
                    {
                        path: '/me/download',
                        component: () => import('@/pages/me/download.vue'),
                    },
                    {
                        path: '/me/profile',
                        component: () => import('@/pages/me/profile.vue'),
                    },

                ]
            },

        ]
    },
    {
        path: '/admin',
        component: () => import("@/pages/admin/index.vue")
    }
]