# useLoaderData

`useLoaderData` 是一个 React-router 的钩子函数，用于获取路由的 loader 数据。

## 使用

返回 loader 处理完之后的数据

```tsx
//router/index.tsx
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: async () => {
      const response = await fetch("xxxxxxxxxx");
      const data = await response.json();
      return {
        data: data,
        message: "success",
      }
    },
  },
]);

//App.tsx
import { useLoaderData } from "react-router";
const App = () => {
  const { data, message } = useLoaderData(); // [!code highlight]
  return <div>{data}</div>;
}
```

:::warning
`useLoaderData` 不会额外触发`fetch`，他只是读取`loader`返回的数据，因为无需担心重新数据请求
:::


