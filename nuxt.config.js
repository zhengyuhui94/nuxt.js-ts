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
        
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/vue-plugins.ts'
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
    modules: [],
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
                            /* Loader options go here */ }
                    }]
                });
            }
        }
    }
}
