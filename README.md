# nuxt-ssr

> My superior Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## nuxt.js 框架搭建 ts-lint
1、不要根据 nuxt.js 文档中的开发工具去搭建 ESLint  
2、npm install tslint typescript --save-dev  
3、添加 tslint.json 文件，具体 tslint 规则可参考 tslint 官方文档  
4、npm install tslint-loader  
5、在 nuxt.config.js 中添加以下配置
```javascript
build: {
    // You can extend webpack config here
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
    }
}
```

## 开发注意事项
1、在 nuxt.js 框架中使用 element-ui 时，在@nuxt/types/app/index.d.ts 和 element/types/loading.d.ts 文件的接口中都实现了 $loading 属性的类型声明，需要将其中的一个 $loading 类型声明代码注释，否则报错。  
**具体注释哪部分代码根据用户使用哪个框架的 loading 决定**

@nuxt/types/app/index.d.ts
```typescript
export interface NuxtApp extends Vue {
  $options: NuxtAppOptions
  // 注释掉 nuxt.js 框架的 $loading
  // $loading: NuxtLoading 
  context: Context
  error(params: NuxtError): void
  isOffline: boolean
  isOnline: boolean
  layout: any // TBD
  layoutName: string
  loadLayout(layout: string): Promise<any> // TBD
  refresh(): Promise<void>
  setLayout(layout: string): any // TBD
}
```
element/types/loading.d.ts
```typescript
declare module 'vue/types/vue' {
  interface Vue {
    // 注释掉 element-ui 框架的 $loading
    // $loading (options: LoadingServiceOptions): ElLoadingComponent 
  }
}
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
