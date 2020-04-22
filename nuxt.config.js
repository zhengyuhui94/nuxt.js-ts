module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#fff'
    },
    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '~/assets/scss/base.scss'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/vue.ts'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxt/typescript-build',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/style-resources'
    ],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    test: /\.(ts|vue)$/,
                    enforce: 'pre',
                    use: [{
                        loader: 'tslint-loader',
                        options: {
                            /* Loader options go here */
                        }
                    }]
                });
            }
        },
        // 配置允许 vue-devtools 调试
        devtools: true,
        // 需要在任何页面中使用一些变量和 mixin，而不必每次都导入这些文件
        styleResources: {
            scss: [
                './assets/scss/tool.scss'
            ]
        },
        postcss: {
            // 添加插件名称作为键，参数作为值
            // 使用 npm 或 yarn 安装它们
            plugins: {
                // 通过传递 false 来禁用插件
                'postcss-url': false,
                'postcss-nested': {},
                'postcss-responsive-type': {},
                'postcss-hexrgba': {},
                'autoprefixer': 'last 100 versions'
            }
        }
    },
    // 在 vue-server-renderer 执行之前，在服务器端运行的一些服务端中间件
    serverMiddleware: [
        '~/serverMiddleware/logger'
    ],
    transition: {
        // 用于设置页面切换过渡效果的属性值。
        // 也可以设置 name 为 layout，设置布局过度的属性值
        name: 'page',
        mode: 'in-out'
    }
}
