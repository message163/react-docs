# useParams

`useParams` 是一个 React-router 的钩子函数，用于获取路由参数。

## 使用

返回当前 URL 中匹配的参数。

```tsx
import { useParams } from "react-router"
function SomeComponent() {
  let params = useParams()
  //params.id
  return <div>{JSON.stringify(params)}</div>
}
```

假设路由为 `/posts/:id`，那么 `params` 的值为：

```ts
{
  id: '123'
}
```

## 类型

```ts
function useParams<ParamsOrKey extends string | Record<string, string | undefined> = string>(): Readonly<[
    ParamsOrKey
] extends [string] ? Params$1<ParamsOrKey> : Partial<ParamsOrKey>>;
```


