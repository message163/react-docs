### React-Router V7

![logo](./image/logo.webp)

React-router 是 React的路由库，如果你学过Vue，跟Vue的Router很相似。它的作用就是，根据不同的`URL`，匹配不同的组件，然后进行渲染。这样就可以实现在单页面应用中跳转页面。

官方文档:https://reactrouter.com/home

### 安装

react-router在最新版本`V7`中，设计了三种模式

- 框架模式

框架模式就是使用，React-router 提供的脚手架模板去安装，安装完成后会自带路由功能。

```bash
npx create-react-router@latest my-react-router-app # 创建项目
cd my-react-router-app # 进入项目
npm i # 安装依赖
npm run dev # 启动项目
```

- 数据模式

数据模式就是，我们可以使用自己的模板去创建`React`项目，比如使用`vite` `webpack` 等，然后自己安装`React-router`。

```bash
npm i react-router #V7不在需要 react-router-dom
```

```ts
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
]);
```

- 声明模式

声明模式，也可以用自己的模板创建`React`项目，然后自己安装`React-router`。

```bash
npm i react-router #V7不在需要 react-router-dom
```

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";
import About from '../about'
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
    </Routes>
  </BrowserRouter>
);
```

::: tip
数据模式和声明模式的区别，数据模式可以享用`React-router`所有的功能，包括数据处理。而声明模式只能享用`React-router`的一部分功能，比如路由跳转。

如果做一个小项目可以使用`声明模式`，如果要做企业级项目可以使用`数据模式`。
:::


### 基本使用    
- src/router/index.ts

pages目录创建两个组件，Home和About

新建目录`router`，在目录中新建文件`index.ts`，在文件中引入`React-router`，然后使用`createBrowserRouter`创建路由。

```ts
import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import About from '../pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
]);

export default router;
```

- src/App.tsx

在`App.tsx`文件中引入路由，然后使用`RouterProvider`包裹`App`组件。

```tsx
import React from 'react';
import { RouterProvider } from 'react-router';
import router from './router';
const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
```
### 路由跳转

在`Home`组件中使用`NavLink`组件跳转到`About`组件。

```tsx
import { NavLink } from 'react-router';
const Home: React.FC = () => {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default Home;
```

在`About`组件中使用`Link`组件跳转到`Home`组件。

```tsx
import { NavLink  } from 'react-router';
const About: React.FC = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default About;
```


