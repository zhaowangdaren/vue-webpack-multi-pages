# vue-webpack-multi-pages
webpack多页面开发脚手架。
> 基于vue-cli的webpack模板改造而成。

# Get Start
1. 在`src`文件夹下创建`XXX.entry.js`作为一个新页面的入口，例如`pageA.entry.js`文件
2. 在项目下创建`XXX.html`作为新页面的模版，例如`pageA.html`
3. 最后在`pages.js`中写上相应的配置，例如:
`pages.js`:
```js
'use strict'

module.exports = [
  {
    name: 'pageA', // 将作为webpack配置中的entry，同时也会作为打包的chunks
    entry: 'pageA.entry.js', // 入口
    filename: 'pageA.html', // 在开发这模式和生产模式，生成相应的html文件
    template: 'pageA.html', // 模版文件，"html-webpack-plugin"将会用到该文件
  },
  {
    name: 'pageB',
    entry: ['pageB.entry.js'],
    filename: 'pageB.html',
    template: 'pageB.html'
  },
  //Add your pages
]
```
