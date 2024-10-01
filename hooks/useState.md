# useState

`useState` 是一个 React Hook，允许函数组件在内部管理状态。

组件通常需要根据交互更改屏幕上显示的内容，例如点击某个按钮更改值，或者输入文本框中的内容，这些值被称为状态值也就是(state)。



## 使用方法
`useState` 接收一个参数，即状态的初始值，然后返回一个数组，其中包含两个元素：当前的状态值和一个更新该状态的函数

```ts
const [state, setState] = useState(initialState)
```

## 注意事项
`useState` 是一个 Hook，因此你只能在 `组件的顶层` 或自己的 `Hook` 中调用它。你不能在循环或条件语句中调用它。<br />

在严格模式中，React 将 `两次调用初始化函数`，以 帮你找到意外的不纯性。这只是开发时的行为，不影响生产

## 用法

### 添加一个状态

```ts
const Card = () => {
  let [index, setIndex] = useState(0)
  let [name, setName] = useState('小满')
  let [arr, setArr] = useState([1, 2, 3])
}
```
按照惯例使用 数组解构 来命名状态变量，例如 [index, setIndex]。

useState 返回一个只包含两个项的数组：

1. 该状态变量 当前的 `state`，最初设置为你提供的 初始化 `state`。
2. set 函数，它允许你在响应交互时将 `state` 更改为任何其他值。

要更新`屏幕上的内容`，请使用新状态调用 set 函数：

>**调用 `set` 函数更新 `state` 将会`重新渲染组件`。**

```ts
function changeName () {
    setName('大满')
}
```
React 会存储新状态，使用新值重新渲染组件，并更新 UI。

### 完整版案例(基本数据类型)

```tsx
import { useState } from "react"
function App() {
  let [name, setName] = useState('小满') //数字 布尔值 null undefined 都可以直接赋值 一样的
  const heandleClick = () => {
    setName('大满')
  }
  return (
    <>
      <button onClick={heandleClick}>更改名称</button>
      <div>{name}</div>
    </>
  )
}
export default App
```

### 完整版案例（复杂数据类型）

#### 数组

在React中你需要将数组视为只读的，不可以直接修改原数组，例如：不可以调用 `arr.push()` `arr.pop()` 等方法。

下面是常见数组操作的参考表。当你操作 React state 中的数组时，你需要避免使用左列的方法，而首选右列的方法：

|  避免使用 (会改变原始数组)	|  推荐使用 (会返回一个新数组）|
|  ----                       | ----                        |
| 添加元素	push，unshift	| concat，[...arr] 展开语法（例子）|
| 删除元素	pop，shift，splice |	filter，slice（例子）|
| 替换元素	splice，arr[i] = ... 赋值 | 	map（例子）|
| 排序	reverse，sort  |	先将数组复制一份（例子）|

##### 数组新增数据

创建一个新数组，包含了原始数组的所有元素，然后在末尾添加新元素，如果想在头部添加新元素，返过来即可。

```tsx
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    setArr([...arr,4]) //末尾新增 扩展运算符
    //setArr([0,...arr]) 头部新增 扩展运算符
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```

##### 数组删除数据

使用filter过滤掉不需要的元素即可。

```tsx
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    setArr(arr.filter((item) => item !== 1)) //删除指定元素
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```

##### 数组替换数据

使用map筛选出需要替换的元素，然后替换为新的元素，其他元素保持不变。

```tsx
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    setArr(arr.map(item => {
      return item == 2 ? 666 : item
    }))
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```

##### 指定位置插入元素

案例在2后面插入2.5，通过slice，截取前面的元素，因为slice返回一个新的数组，然后在中间插入我们需要插入的元素，然后把末尾的元素也通过slice截取出来，拼接到后面。

slice文档 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

```tsx
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    let startIndex = 0
    let endIndex = 2;
    setArr(
      [
        ...arr.slice(startIndex, endIndex),
        2.5,
        ...arr.slice(endIndex)
      ]
    )
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```

##### 排序旋转等

案例，创建一个新数组，然后通过sort排序。

```tsx
import { useState } from "react"
function App() {
  let [arr, setArr] = useState([1, 2, 3])
  const heandleClick = () => {
    let newList = [...arr].map(v => v + 1) //拷贝到新数组
    newList.sort((a, b) => b - a)
    //newList.reverse()旋转
    setArr(newList)
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div id="aaa">{arr}</div>
    </>
  )
}
export default App
```

#### 对象

useState可以接受一个函数，可以在函数里面编写逻辑，初始化值，注意这个只会执行一次，更新的时候就不会执行了。

在使用setObject的时候，可以使用Object.assign合并对象 或者 ... 合并对象，不能单独赋值，不然会覆盖原始对象。

```tsx
import { useState } from "react"
function App() {
  let [obj, setObject] = useState(() => {
    const date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    return {
      date,
      name: '小满',
      age: 25
    }
  })
  const heandleClick = () => {
    setObject({
      ...obj,
      name: '大满'
    })
    //setObject(Object.assign({}, obj, { age: 26 })) 第二种写法
  }
  return (
    <>
      <button onClick={heandleClick}>更改值</button>
      <div>日期：{obj.date}</div>
      <div>姓名：{obj.name}</div>
      <div>年龄：{obj.age}</div>
    </>
  )
}
export default App
```

## useState更新机制

#### 异步机制

useState set函数是异步更新的来看下面的案例：

```tsx
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index + 1)
    console.log(index,'index') //0
  }
  return (
    <>
       <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>
      
    </>
  )
}
export default App
```
此时index应该打印1，但是还是0，因为我们正常编写的代码是同步的，所以会先执行，而set函数是异步的所以后执行，这么做是为了性能优化，因为我们要的是结果而不是过程。


#### 内部机制

当我们多次以相同的操作更新状态时，React 会进行比较，如果值相同，则会屏蔽后续的更新行为。自带`防抖`的功能，防止频繁的更新。

案例：

```tsx
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    console.log(index,'index')
  }
  return (
    <>
       <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>
      
    </>
  )
}
export default App
```

结果是1并不是3，因为`setIndex(index + 1)`的值是一样的，后续操作被屏蔽掉了，阻止了更新。

为了解决这个问题，你可以向`setIndex` 传递一个更新函数，而不是一个状态。

```tsx
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index => index + 1) //1
    setIndex(index => index + 1) //2
    setIndex(index => index + 1) //3
  }
  return (
    <>
      <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>

    </>
  )
}
export default App
```

1. index => index + 1 将接收 0 作为待定状态，并返回 1 作为下一个状态。
2. index => index + 1 将接收 1 作为待定状态，并返回 2 作为下一个状态。
3. index => index + 1 将接收 2 作为待定状态，并返回 3 作为下一个状态。

现在没有其他排队的更新，因此 React 最终将存储 3 作为当前状态。

按照惯例，通常将待定状态参数命名为状态变量名称的第一个字母，例如 prevIndex 或者其他你觉得更清楚的名称。