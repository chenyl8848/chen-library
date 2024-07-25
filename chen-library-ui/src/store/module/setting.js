import { defineStore } from "pinia";

const useSettingStore = defineStore('Setting', {
    state: () => {
        return {
            "system": {
                "domain": "https://moredoc.mnt.ltd",
                "title": "MOREDOC · 魔豆文库(演示站点)",
                "keywords": "MOREDOC · 魔豆文库(演示站点)",
                "description": "MOREDOC · 魔豆文库(演示站点)",
                "logo": "//moredoc.mnt.ltd/uploads/5/1/c/5/9/51c59a56e1b49eabc12042beae0f3e71.png",
                "favicon": "//moredoc.mnt.ltd/uploads/1/6/c/6/1/16c6131482c64d9f38cd887c8cc1d705.ico",
                "icp": "粤ICP备2022091336号",
                "analytics": "var _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https://hm.baidu.com/hm.js?be74370f1c70319aeb6dbf546a531ea8\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();",
                "sitename": "魔豆文库(演示站点)",
                "copyright_start_year": "2019",
                "register_background": "/uploads/f/2/8/5/e/f285ef40a325b1f16c467a2c5e0ea3f8.jpg",
                "login_background": "//moredoc.mnt.ltd/uploads/f/2/8/5/e/f285ef40a325b1f16c467a2c5e0ea3f8.jpg",
                "recommend_words": [
                    "语文",
                    "Python",
                    "阿里巴巴",
                    "Java"
                ],
                "version": "v3.2.0",
                "enable_watermark": true,
                "watermark": "/static/images/watermark.svg",
                "enable_powered_by": true,
                "credit_name": "魔豆",
                "sec_icp": "京公网安备 44030402005740 号",
                "credit_exchange": 10,
                "show_exchange": true,
                "enable_sms": true
            },
            "footer": {
                "about": "/article/about",
                "contact": "/article/contact",
                "agreement": "/article/agreement",
                "copyright": "/article/copyright",
                "feedback": "/article/feedback"
            },
            "security": {
                "close_statement": "false",
                "enable_register": true,
                "enable_captcha_login": true,
                "enable_captcha_register": true,
                "enable_captcha_comment": true,
                "enable_captcha_find_password": true,
                "max_document_size": 50,
                "enable_verify_register_email": true,
                "enable_wechatmp_login": true
            },
            "download": {
                "enable_captcha_download": true,
                "enable_code_download": true,
                "code_tip": "示例：关注微信公众号【刻舟求荐】，发送关键字【下载码】获取魔豆文库下载码下载文档。（注意：这里只是示例，当前下载码为morefun）",
                "times_every_day": 10000,
                "times_every_ip": 20,
                "max_price": 10
            },
            "display": {
                "show_register_user_count": true,
                "show_index_categories": true,
                "pages_per_read": 10,
                "copyright_statement": "本站为【魔豆文库】演示站点，本站所上传文档，仅作演示使用，如侵犯您的权益，请联系我们进行删除。",
                "show_document_descriptions": true,
                "show_order": true,
                "show_document_count": true,
                "show_document_view_count": true,
                "show_document_download_count": true,
                "show_document_favorite_count": true,
                "wechat_tip": "我们的公众号同样精彩",
                "wechat_qrcode": "/uploads/2/9/e/4/d/29e4dde26911e5b41a3f329c4a746628.jpg",
                "contact_tip": "联系我们，了解魔豆文库产品",
                "contact_link": "https://mnt.ltd/moredoc.html",
                "index_document_style": "card"
            },
            "payment": {
                "enable_xunhupay": true,
                "enable_alipay": true,
                "enable_wechatpay": true,
                "xunhupay_name": "虎皮椒支付"
            },
            "vip": {
                "enable": true,
                "icon": "/uploads/b/c/8/c/c/bc8ccd189a1dbdbdda32fcee073b8366.png",
                "month_price": 10,
                "month_original_price": 2000,
                "month_download": 30,
                "month_document_discount": 90,
                "quarter_price": 25,
                "quarter_original_price": 5000,
                "quarter_download": 100,
                "quarter_document_discount": 80,
                "year_price": 80,
                "year_original_price": 16000,
                "year_download": 400,
                "year_document_discount": 70,
                "enable_credit_pay": true,
                "month_times_every_day": 100,
                "quarter_times_every_day": 300,
                "year_times_every_day": 1500
            },
            "language": [
                {
                    "id": 1,
                    "language": "中文（简体）",
                    "code": "zh-CN"
                },
                {
                    "id": 2,
                    "language": "中文（繁体）",
                    "code": "zh-TW"
                },
                {
                    "id": 3,
                    "language": "英语",
                    "code": "en"
                },
                {
                    "id": 4,
                    "language": "法语",
                    "code": "fr"
                },
                {
                    "id": 5,
                    "language": "韩语",
                    "code": "ko"
                },
                {
                    "id": 6,
                    "language": "德语",
                    "code": "de"
                },
                {
                    "id": 7,
                    "language": "日语",
                    "code": "ja"
                },
                {
                    "id": 8,
                    "language": "俄语",
                    "code": "ru"
                },
                {
                    "id": 9,
                    "language": "葡萄牙语",
                    "code": "pt"
                },
                {
                    "id": 10,
                    "language": "意大利语",
                    "code": "it"
                }
            ],

            "banner": [
                {
                    "id": 4,
                    "title": "阿里云",
                    "path": "//moredoc.mnt.ltd/uploads/b/e/2/3/8/be23851ab97d01c65a7f0395c854763a.webp",
                    "url": "https://www.aliyun.com/"
                },
                {
                    "id": 6,
                    "title": "百度云",
                    "path": "//moredoc.mnt.ltd/uploads/4/c/c/0/0/4cc00abdd9917f500b97d399b95a194f.png",
                    "url": "https://cloud.baidu.com/"
                },
                {
                    "id": 9,
                    "title": "腾讯云",
                    "path": "//moredoc.mnt.ltd/uploads/f/0/1/1/9/f0119d63c75e61061c4078109a339133.png",
                    "url": "https://cloud.tencent.com"
                }
            ]


            // system: {
            //     // logo: '//moredoc.mnt.ltd/uploads/5/1/c/5/9/51c59a56e1b49eabc12042beae0f3e71.png',
            //     logo: '//chencoding.top:8090/_media/logo.png',
            //     siteName: 'Java陈序员',
            //     recommendWords: ['Java', 'MySQL']
            // }
        }
    }
})

export default useSettingStore