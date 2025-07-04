# useLocation

`useLocation` 是一个 React-router 的钩子函数，用于获取当前路由的 location 对象。

## 使用

返回当前 URL 的 location 对象。

```tsx
import { useLocation } from 'react-router'

function SomeComponent() {
  let location = useLocation()
  return <div>{JSON.stringify(location)}</div>
}
```

## 类型

```ts
function useLocation(): Location;
// 类型定义
interface Location<State> {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: State;
}
```

## Location

- hash

```ts
hash: string;
```
URL 片段标识符，以 # 开头。

<hr />

- key

```ts
key: string;
```
当前路由的唯一标识符。

<hr />

- pathname

```ts
pathname: string;
```
URL 路径名，以 / 开头。

<hr />

- search

```ts
search: string;
```
URL 搜索字符串，以 ? 开头。

<hr />

- state

```ts
state: State;
State = any
```
传递到当前路径的 state 对象。

<hr />




