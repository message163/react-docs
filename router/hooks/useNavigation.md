# useNavigation

## 什么是 useNavigation

`useNavigation` 是一个 React-Router 的钩子，用于获取当前路由的导航状态。


## 如何使用 useNavigation

```ts
import { useNavigation } from 'react-router';

const navigation = useNavigation();
```

## navigation.state

- `idle` 空闲状态
- `submitting` 提交状态
- `loading` 加载状态

在使用正常导航的情况或者`GET`提交表单的时候会经过以下状态转换：

```
idle → loading → idle
```
在使用 POST、PUT、PATCH 或 DELETE 提交的表单会经历以下状态转换：

```
idle → submitting → loading → idle
```

:::tip
如果没有loader,则不会经历`loading`状态
:::

可以编写自己的逻辑来处理这些状态

```ts
const navigation = useNavigation();

const isLoading = navigation.state === 'loading';
const isSubmitting = navigation.state === 'submitting';
const isIdle = navigation.state === 'idle';
```

## navigation.formData

当使用原生表单`<form>`提交的时候,并且是POST、PUT、PATCH 或 DELETE 请求的时候,可以获取到表单的数据。

如果是GET请求则 `formData` 为 空,需要在 `navigation.location.search` 中获取GET请求的数据


## navigation.json

当提交表单的时候,如果表单的`enctype`为`application/json`的时候,可以获取到表单的数据。


## navigation.text

当提交表单的时候,如果表单的`enctype`为`text/plain`的时候,可以获取到表单的数据。


## navigation.location

获取当前路由的位置跟`useLocation`的返回值是一样的


## navigation.formAction

获取表单的提交地址例如: `/login`,如果是 `GET`则为空，如果是`/detail/id`则返回`/id`


## navigation.formMethod

获取表单的提交方式例如: `POST`, `GET`, `PUT`, `PATCH`, `DELETE`


## navigation.formEncType

获取表单的提交方式例如: `application/x-www-form-urlencoded`, `multipart/form-data`, `application/json` `text/plain`




























