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
        component: () => import("@/layout/admin.vue"),
        redirect: '/admin/dashboard',
        children: [
            {
                path: '/admin/dashboard',
                component: () => import("@/pages/admin/dashboard.vue")
            },
            {
                path: '/admin/document',
                children: [
                    {
                        path: '/admin/document/category',
                        component: () => import("@/pages/admin/document/category.vue")
                    },
                    {
                        path: '/admin/document/list',
                        component: () => import("@/pages/admin/document/list.vue")
                    },
                    {
                        path: '/admin/document/language',
                        component: () => import("@/pages/admin/document/language.vue")
                    },
                    {
                        path: '/admin/document/searchrecord',
                        component: () => import("@/pages/admin/document/searchrecord.vue")
                    },
                    {
                        path: '/admin/document/recycle',
                        component: () => import("@/pages/admin/document/recycle.vue")
                    }
                ]
            },
            {
                path: '/admin/article',
                children: [
                    {
                        path: '/admin/article/category',
                        component: () => import("@/pages/admin/article/category.vue")
                    },
                    {
                        path: '/admin/article/list',
                        component: () => import("@/pages/admin/article/list.vue")
                    },
                    {
                        path: '/admin/article/recycle',
                        component: () => import("@/pages/admin/article/recycle.vue")
                    }
                ]
            },
            {
                path: '/admin/user',
                children: [
                    {
                        path: '/admin/user/list',
                        component: () => import("@/pages/admin/user/list.vue")
                    },
                    {
                        path: '/admin/user/role',
                        component: () => import("@/pages/admin/user/role.vue")
                    },
                    {
                        path: '/admin/user/permission',
                        component: () => import("@/pages/admin/user/permission.vue")
                    },
                    {
                        path: '/admin/user/punishment',
                        component: () => import("@/pages/admin/user/punishment.vue")
                    },
                ]
            },
            {
                path: '/admin/banner',
                component: () => import("@/pages/admin/banner.vue")
            },
            {
                path: '/admin/navigation',
                component: () => import("@/pages/admin/navigation.vue")
            },
            {
                path: '/admin/friendlink',
                component: () => import("@/pages/admin/friendlink.vue")
            },
            {
                path: '/admin/comment',
                component: () => import("@/pages/admin/comment.vue")
            },
            {
                path: '/admin/report',
                component: () => import("@/pages/admin/report.vue")
            },
            {
                path: '/admin/advertisement',
                component: () => import("@/pages/admin/advertisement.vue")
            },
            {
                path: '/admin/attachment',
                component: () => import("@/pages/admin/attachment.vue")
            },
            {
                path: '/admin/setting',
                children: [
                    {
                        path: '/admin/setting/system',
                        component: () => import("@/pages/admin/setting/system.vue")
                    },
                    {
                        path: '/admin/setting/display',
                        component: () => import("@/pages/admin/setting/display.vue")
                    },
                    {
                        path: '/admin/setting/footer',
                        component: () => import("@/pages/admin/setting/footer.vue")
                    },
                    {
                        path: '/admin/setting/captcha',
                        component: () => import("@/pages/admin/setting/captcha.vue")
                    },
                    {
                        path: '/admin/setting/security',
                        component: () => import("@/pages/admin/setting/security.vue")
                    },
                    {
                        path: '/admin/setting/converter',
                        component: () => import("@/pages/admin/setting/converter.vue")
                    },
                    {
                        path: '/admin/setting/download',
                        component: () => import("@/pages/admin/setting/download.vue")
                    },
                    {
                        path: '/admin/setting/score',
                        component: () => import("@/pages/admin/setting/score.vue")
                    },
                    {
                        path: '/admin/setting/ssr',
                        component: () => import("@/pages/admin/setting/ssr.vue")
                    },
                    {
                        path: '/admin/setting/email',
                        component: () => import("@/pages/admin/setting/email.vue")
                    },
                ]
            }
        ]
    }
]