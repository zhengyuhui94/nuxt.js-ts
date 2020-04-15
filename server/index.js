const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const Utils = require('./utils/utils_tools.js')
//通过环境变量接口地址等获取信息
global.serverObj = Utils.mapValue(require('./json/apiConfig'))

// 挂载路由
app.use('/', require('./router/routes'))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')

config.dev = process.env.NODE_ENV === 'development'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
