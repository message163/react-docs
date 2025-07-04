# useSyncExternalStore

useSyncExternalStore 是 React 18 引入的一个 Hook，用于从外部存储（例如状态管理库、浏览器 API 等）获取状态并在组件中同步显示。这对于需要跟踪外部状态的应用非常有用。

## 场景

1. 订阅外部 store 例如(redux,Zustand`德语`)
2. 订阅浏览器API 例如(online,storage,location)等
3. 抽离逻辑，编写自定义hooks
4. 服务端渲染支持

## 用法

```js
const res = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

- subscribe：用来订阅数据源的变化，接收一个回调函数，在数据源更新时调用该回调函数。
- getSnapshot：获取当前数据源的快照（当前状态）。
- getServerSnapshot?：在服务器端渲染时用来获取数据源的快照。

返回值：该 res 的当前快照，可以在你的渲染逻辑中使用

```ts
const subscribe = (callback: () => void) => {
    // 订阅
    callback() 
    return () => { 
        // 取消订阅
    }
}

const getSnapshot = () => {
    return data
}

const res = useSyncExternalStore(subscribe, getSnapshot)
```

## 案例

### 1. 订阅浏览器Api 实现自定义hook(useStorage)

我们实现一个useStorage Hook，用于订阅 localStorage 数据。这样做的好处是，我们可以确保组件在 localStorage 数据发生变化时，自动更新同步。

实现代码

我们将创建一个 useStorage Hook，能够存储数据到 localStorage，并在不同浏览器标签页之间同步这些状态。此 Hook 接收一个键值参数用于存储数据的键名，还可以接收一个默认值用于在无数据时的初始化。


在 hooks/useStorage.ts 中定义 useStorage Hook：

```ts
import { useSyncExternalStore } from "react"

/**
 * 
 * @param key 存储到localStorage 的key
 * @param defaultValue 默认值
 */
export const useStorage = (key: any, defaultValue?: any) => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('storage', (e) => {
            console.log('触发了', e)
            callback()
        })
        return () => window.removeEventListener('storage', callback)
    }
    //从localStorage中获取数据 如果读不到返回默认值
    const getSnapshot = () => {
        return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null) || defaultValue
    }
    //修改数据
    const setStorage = (value: any) => {
        localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(new StorageEvent('storage')) //手动触发storage事件
    }
    //返回数据
    const res = useSyncExternalStore(subscribe, getSnapshot)

    return [res, setStorage]
}
```

在 App.tsx 中，我们可以直接使用 useStorage，来实现一个简单的计数器。值会存储在 localStorage 中，并且在刷新或其他标签页修改数据时自动更新。

```tsx
import { useStorage } from "./hooks/useStorage"
const App = () => {
  const [val, setVal] = useStorage('data', 1)
  return (<>
    <h3>{val}</h3>
    <button onClick={() => setVal(val + 1)}>设置val</button>
  </>)
}

export default App
```

效果演示

1. 值的持久化：点击按钮增加 val，页面刷新后依然会保留最新值。
2. 跨标签页同步：在多个标签页打开该应用时，任意一个标签页修改 val，其他标签页会实时更新，保持同步状态。

### 2. 订阅history实现路由跳转

实现一个简易的useHistory Hook，获取浏览器url信息 + 参数

```ts
import { useSyncExternalStore } from "react"
export const useHistory = () => {
    const subscribe = (callback: () => void) => {
        window.addEventListener('popstate', callback)
        window.addEventListener('hashchange', callback)
        return () => {
            window.removeEventListener('popstate', callback)
            window.removeEventListener('hashchange', callback)
        }
    }
    const getSnapshot = () => {
        return window.location.href
    }
    const push = (path: string) => {
        window.history.pushState(null, '', path)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }
    const replace = (path: string) => {
        window.history.replaceState(null, '', path)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }
    const res = useSyncExternalStore(subscribe, getSnapshot)
    return [res, push, replace] as const
}
```
使用 useHistory Hook

让我们在组件中使用这个 useHistory Hook，实现基本的前进、后退操作以及程序化导航。

```tsx
import { useHistory } from "./hooks/useHistory"
const App = () => {
  const [history, push, replace] = useHistory()
  return (<>
    <div>当前url:{history}</div>
    <button onClick={() => { push('/aaa') }}>跳转</button>
    <button onClick={() => { replace('/bbb') }}>替换</button>
  </>)
}

export default App
```

效果演示

- history：这是 useHistory 返回的当前路径值。每次 URL 变化时，useSyncExternalStore 会自动触发更新，使 history 始终保持最新路径。

- push 和 replace：点击“跳转”按钮调用 push("/aaa")，会将 /aaa 推入历史记录；点击“替换”按钮调用 replace("/bbb")，则会将当前路径替换为 /bbb。


## 注意事项

如果 `getSnapshot` 返回值不同于上一次，React 会重新渲染组件。这就是为什么，如果总是返回一个不同的值，会进入到一个无限循环，并产生这个报错。


`Uncaught (in promise) Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.`


```ts 
function getSnapshot() {
  return myStore.todos; //object
}
```
这种写法每次返回了对象的引用，即使这个对象没有改变，React 也会重新渲染组件。

如果你的 store 数据是可变的，`getSnapshot` 函数应当返回一个它的不可变快照。这意味着 确实 需要创建新对象，但不是每次调用都如此。而是应当保存最后一次计算得到的快照，并且在 store 中的数据不变的情况下，返回与上一次相同的快照。如何决定可变数据发生了改变则取决于你的可变 store。

```ts
function getSnapshot() {
  if (myStore.todos !== lastTodos) {
    // 只有在 todos 真的发生变化时，才更新快照
    lastSnapshot = { todos: myStore.todos.slice() };
    lastTodos = myStore.todos;
  }
  return lastSnapshot;
}
```