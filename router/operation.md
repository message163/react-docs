# 路由操作

路由的操作是由两个部分组成的:

- loader
- action

在平时工作中大部分都是在做`增刪查改(CRUD)`的操作，所以一个界面的接口过多之后就会使逻辑臃肿复杂，难以维护，所以需要使用路由的高级操作来优化代码。


## loader

[useLoaderData速查文档](./hooks/useLoaderData.md)

:::tip
只有GET请求才会触发loader，所以适合用来获取数据
:::

在之前的话我们是 `RenderComponent(渲染组件)`-> `Fetch(获取数据)`-> `RenderView(渲染视图)`

有了loader之后是 `loader(通过fetch获取数据)` -> `useLoaderData(获取数据)` -> `RenderComponent(渲染组件)` 


```ts
//router/index.tsx
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: async () => {
      const data = await response.json();
      const response = await getUser(data); // [!code highlight] 获取数据
      return {
        data: response.list,
        message: "success",
      }
    },
  },
]);
//App.tsx
import { useLoaderData } from "react-router";
const App = () => {
  const { data, message } = useLoaderData(); // [!code highlight] 获取数据
  return <div>{data}</div>;
}
```

## action

一般用于表单提交，删除，修改等操作。

[useSubmit速查文档](./hooks/useSubmit.md) [useActionData速查文档](./hooks/useActionData.md)


:::tip
只有POST DELETE PATCH PUT等请求才会触发action，所以适合用来提交表单
:::

```tsx
//router/index.tsx
import { createBrowserRouter } from "react-router";
const router = createBrowserRouter([
    {
        // path: '/index',
        Component: Layout,
        children: [
            {
                path: 'about',
                Component: About,
                action: async ({ request }) => {
                    const formData = await request.formData();
                    await createUser(formData); // [!code highlight] 创建用户
                    return {
                        data: table,
                        success: true
                    }
                }
            },
        ],
    },
]);
//App.tsx
import { useSubmit } from 'react-router';
import { Card, Form, Input, Button } from 'antd';
export default function About() {
  const submit = useSubmit();
  return <Card>
    <Form onFinish={(values) => {
      submit(values, { method: 'post'}) // [!code highlight]  提交表单
    }}>
      <Form.Item name='name' label='姓名'>
        <Input />
      </Form.Item>
      <Form.Item name='age' label='年龄'>
        <Input />
      </Form.Item>
      <Button type='primary' htmlType='submit'>提交</Button>
    </Form>
  </Card>;
}
```

## 状态变更

我们可以配合`useNavigation`来管理表单提交的状态

[useNavigation速查文档](./hooks/useNavigation.md)

1. GET提交会经过以下状态:

```
idle -> loading -> idle
```

2. POST提交会经过以下状态:

```
idle -> submitting ->loading -> idle
```

所以我们可以根据这些状态来控制`disabled` `loading` 等行为

```tsx
import { useNavigation, useSubmit } from "react-router";
const submit = useSubmit();
const navigation = useNavigation();

return (
    <div>
         {navigation.state === 'loading' && <div>loading...</div>}
        <button disabled={navigation.state === 'submitting'}>提交</button>
    </div>
)








