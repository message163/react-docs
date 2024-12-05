# useRef
当你在React中需要处理DOM元素或需要在组件渲染之间保持持久性数据时，便可以使用useRef。

```ts
import { useRef } from 'react';
const refValue = useRef(initialValue)
refValue.current // 访问ref的值 类似于vue的ref,Vue的ref是.value，其次就是vue的ref是响应式的，而react的ref不是响应式的
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
      <button onClick={heandleClick}>获取dom元素</button>
    </>
  )
}
export default App
```

## 数据存储

我们实现一个保存count的新值和旧值的例子，但是在过程中我们发现一个问题，就是num的值一直为0，这是为什么呢？

因为等`useState`的 `SetCount`执行之后，组件会重新rerender,num的值又被初始化为了0，所以num的值一直为0。

```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function App() {
   let num = 0
   let [count, setCount] = useState(0)
   const handleClick = () => {
      setCount(count + 1)
      num = count;
   };
   return (
      <div>
         <button onClick={handleClick}>增加</button>
         <div>{count}:{num}</div>
      </div>
   );
}

export default App;
```

![alt text](./img/useRef-1.png)

#### 如何修改？

我们可以使用useRef来解决这个问题，因为useRef只会在初始化的时候执行一次，当组件reRender的时候，useRef的值不会被重新初始化。

```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function App() {
   let num = useRef(0)
   let [count, setCount] = useState(0)
   const handleClick = () => {
      setCount(count + 1)
      num.current = count;
   };
   return (
      <div>
         <button onClick={handleClick}>增加</button>
         <div>{count}:{num.current}</div>
      </div>
   );
}

export default App;
```

![alt text](./img/useRef-2.png)

## 实际应用

我们实现一个计时器的例子，在点击开始计数的时候，计时器会每300ms执行一次，在点击结束计数的时候，计时器会被清除。

#### 问题

我们发现，点击end的时候，计时器并没有被清除，这是为什么呢？

#### 原因

这是因为组件一直在重新ReRender,所以timer的值一直在被重新赋值为null，导致无法清除计时器。


```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function App() {
   console.log('render')
   let timer: NodeJS.Timeout | null = null
   let [count, setCount] = useState(0)
   const handleClick = () => {
      timer = setInterval(() => {
         setCount(count => count + 1)
      }, 300)
   };
   const handleEnd = () => {
      console.log(timer);
      if (timer) {
         clearInterval(timer)
         timer = null
      }
   };
   return (
      <div>
         <button onClick={handleClick}>开始计数</button>
         <button onClick={handleEnd}>结束计数</button>
         <div>{count}</div>
      </div>
   );
}

export default App;
```

#### 如何修改？

我们可以使用useRef来解决这个问题，因为useRef的值不会因为组件的重新渲染而改变。

```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

function App() {
   console.log('render')
   let timer = useRef<null | NodeJS.Timeout>(null)
   let [count, setCount] = useState(0)
   const handleClick = () => {
      timer.current = setInterval(() => {
         setCount(count => count + 1)
      }, 300)
   };
   const handleEnd = () => {
      if (timer.current) {
         clearInterval(timer.current)
         timer.current = null
      }
   };
   return (
      <div>
         <button onClick={handleClick}>开始计数</button>
         <button onClick={handleEnd}>结束计数</button>
         <div>{count}</div>
      </div>
   );
}

export default App;
```

## 注意事项

1. 组件在重新渲染的时候，useRef的值不会被重新初始化。

2. 改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。

3. useRef的值不能作为useEffect等其他hooks的依赖项，因为它并不是一个响应式状态。

4. useRef不能直接获取子组件的实例，需要使用forwardRef。
