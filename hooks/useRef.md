# useRef
当你在React中需要处理DOM元素或需要在组件渲染之间保持持久性数据时，便可以使用useRef。

```ts
import { useRef } from 'react';
const ref = useRef(initialValue)
```

## 通过Ref操作DOM元素

#### 参数 
- initialValue：ref 对象的 current 属性的初始值。可以是任意类型的值。这个参数在首次渲染后被忽略。

#### 返回值 
- useRef返回一个对象，对象的current属性指向传入的初始值。 `{current:xxxx}`

#### 注意 
- 改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。
- 除了 初始化 外不要在渲染期间写入或者读取 ref.current，否则会使组件行为变得不可预测。

```tsx
import { useRef } from "react"
function App() {
  //首先，声明一个 初始值 为 null 的 ref 对象
  let div = useRef(null)
  const heandleClick = () => {
    //当 React 创建 DOM 节点并将其渲染到屏幕时，React 将会把 DOM 节点设置为 ref 对象的 current 属性
    console.log(div.current)
  }
  return (
    <>
      {/*然后将 ref 对象作为 ref 属性传递给想要操作的 DOM 节点的 JSX*/}
      <div ref={div}>dom元素</div>
      <button onClick={heandleClick}>更改值</button>
    </>
  )
}
export default App
```

## 数据存储

改变 ref 不会触发重新渲染。这意味着 ref 是存储一些不影响组件视图输出信息的完美选择。

例如存储定时器id之类的

```tsx
import { useRef, useState } from "react"
function App() {
  let intervalId = useRef<null | number>(null)
  let [time, setTime] = useState(0)
  const start = () => {
    setTime(0)
    intervalId.current = setInterval(() => {
      setTime(time => time + 1)
    },100)
  }
  const end = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current)
      
    }
  }
  return (
    <>
      <h1>当前计时：{time}</h1>
      <button onClick={start}>开始</button>
      <button onClick={end}>结束</button>
    </>
  )
}
export default App
```
这个例子使用了 state 和 ref 的组合, `time` 是state变量，用于渲染，但是还需要`intervalId` 存储计时器ID，用于清除计时器，因为`intervalId` 不需要渲染，所以应该把它存储在ref中，并且手动更新.