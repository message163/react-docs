# React入门

## 什么是react? 

<img width="100px" src="./source/react.svg">

React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook(现Meta) 开发和维护，并在2013年开源。React 的设计初衷是帮助开发者构建复杂的用户界面，同时保持代码的可维护性和可扩展性。

## react的特点

1. 组件化：React 通过将 UI 分解为独立的、可重用的组件，使得代码更易于管理和维护。每个组件只关注于自身的逻辑和视图。

2. 声明式编程：React 采用声明式的编程风格，开发者只需描述 UI 应该是什么样子的，而不需要手动操作 DOM。React 会根据数据的变化自动更新 UI。

3. 虚拟 DOM：React 使用虚拟 DOM（Virtual DOM）来优化 UI 的更新过程。当数据发生变化时，React 会创建一个新的虚拟 DOM，然后将其与之前的虚拟 DOM 进行比较，找出最小的变化，并将这些变化应用到实际的 DOM 中，从而提高性能。

4. 单向数据流：React 采用单向数据流（也称为单向数据绑定），这意味着数据在组件之间通过 props 进行传递，使得数据的流动更加清晰和可预测。

5. 生态系统：React 有一个庞大且活跃的社区，提供了大量的第三方库和工具，如 React Router（用于路由管理）、Redux（用于状态管理）等，帮助开发者构建复杂的应用。

## 前置知识

你必须学会以下知识才能使用 React:

- JavaScript`(es6+)`
- HTML
- CSS
- TypeScript(基本使用) [Typescript教程](https://www.bilibili.com/video/BV1wR4y1377K/?spm_id_from=333.999.0.0)
- Npm包管理器

## React市场情况
npm官网统计(不包含镜像) 2024-9-4

1. react   18.3.1 周下载量 `22,538,510`
2. vue     3.4.31 周下载量 `4,699,312`
3. Angular 18.1.0 周下载量 `3,216,414`
4. jQuery  3.7.10 周下载量 `10,210,940`
5. solid   1.8.18 周下载量 `288,278`

## 安装环境准备

1. node.js
下载地址：https://nodejs.org/en **建议安装18以上版本，或者使用nvm管理node版本**
2. vsocde编辑器(如果安装过了请略过|或者喜欢其他编辑器) https://code.visualstudio.com/
3. vscode插件安装 可选 (`Simple React Snippets`)

![plugin](./source/vscode.png)

![alt text](https://github.com/burkeholland/simple-react-snippets/raw/HEAD/images/snippets-in-action.gif)
