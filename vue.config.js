'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '后台' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _:"lodash"   
        })
    ]
  },
  devServer: {
    // port: port,
    // open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: {
      // 代理:
        // 拦截某些请求,包装之后被转发到"target"地址
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `http://localhost`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: '' // 替换api中的部分字符为另一个字符
      //   }
      // }
      //按照这种形式配置 不再需呀验证码(暂时去掉)
      // 代理另一个最重要的作用: 解决跨域问题
      // 浏览器同源策略: A ==>(ajax)  B 的资源  由于浏览器的安全策略 是不允许直接访问的
      //  产生的问题是如何解决跨域问题:
          //   1. jsonp(了解,不用了)
          //   2. cors  https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
                    // a) 后台配置的
          //   3. webpack 代理  可以包装本地请求,使目标主机无法判断是否是跨域请求
                    // a) 打包后不可用
          //   4. nginx 代理解决跨域 

      '^/admin':{
          target:'http://59.110.138.169',  // http://59.110.138.169/admin/student/list
          // target:'http://192.160.0.100',
          changeOrigin:true,
      },
      '^/imgApi':{
        target:'http://59.110.138.169',  // http://59.110.138.169/admin/student/list
        // target:'http://192.160.0.100',
        changeOrigin:true,
          pathRewrite: {
          '^/imgApi': '' // 替换api中的部分字符为另一个字符
        }

    }
    },
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
