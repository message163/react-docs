# React开发环境搭建
选择一个你喜欢的目录，然后运行以下命令：

```sh
npm init vite
```
- 执行完成之后会让你输入项目名称 例如 `react-demo`
- 接下来会让你选择一个框架 这时候选择 `react`
- 然后选择 `TypeScript + SWC` 如果你不会ts就选择js

![alt text](./source/image.png)


## 目录介绍

- public 公共目录
- src
  - assets 静态资源
  - App.css 根组件样式
  - App.tsx 根组件
  - index.css 全局css文件
  - main.tsx 全局tsx文件
  - vite-env.d.ts 声明文件
- .eslintrc.cjs eslint配置文件
- .gitignore git忽略文件
- index.html 入口文件index.html
- package.json 项目依赖模块文件
- tsconfig.json ts配置文件
- tsconfig.node.json vite-ts配置文件
- vite.config.ts vite配置文件

### FAQ:
- **public公共目录和assets静态资源有什么区别?**

答：public目录的资源编译之后会存放到根目录，而静态资源assets是会随着项目一起打包的，public则不会被编译。

- **为什么main.tsx的`document.getElementById('root')!`要加一个!**

答：因为`document.getElementById('root')`返回可能为空，这时候就会报错。!是非空断言，告诉编辑器这个表达式不会为空。



## 命令介绍(package.json)

```json
"dev": "vite",//启动开发模式项目
"build": "tsc && vite build", //打包构建生产包
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",//代码检查
"preview": "vite preview" //预览模式
```

eslint命令详解

```sh
eslint .：对当前目录（以及子目录）中的文件运行 ESLint。
--ext ts,tsx：指定要检查的文件扩展名为 .ts 和 .tsx，即 TypeScript 和 TypeScript React 文件。
--report-unused-disable-directives：报告未使用的 eslint-disable 指令。这可以帮助你清理不再需要的 ESLint 禁用指令。
--max-warnings 0：将警告数量限制为 0。如果有任何警告，ESLint 将返回非零退出代码，这通常用于在 CI/CD 环境中确保代码库没有任何警告。
```