# useActionData

`useActionData` 是一个 React-router 的钩子函数，用于获取路由的 action 数据。

## 使用

返回 action 处理完之后的数据,通常被用于错误处理

```tsx
//router/index.tsx
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    action: async ({ request }) => {
      //可以根据不同的格式获取不同的数据
      const formData = await request.formData(); //获取formData数据
      //const json = await request.json(); //获取json数据
      //const text = await request.text(); //获取text数据
      const email = formData.get("email");
      const password = formData.get("password");
      const errors = [];
      if (!email) {
        errors.push("Email is required");
      }
      if (!password) {
        errors.push("Password is required");
      }
      return { errors };

      return await createUser({ email, password });
    },
  },
]);

//App.tsx
import { useActionData } from "react-router";
const App = () => {
  const errors = useActionData(); // [!code highlight]
  return <div>{errors}</div>;
}
```



