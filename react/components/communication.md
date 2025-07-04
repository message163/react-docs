# 组件通信Props

React 组件使用 `props` 来互相通信。每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它。Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 JavaScript 值，包括对象、数组和函数 以及html 元素，这样可以使我们的组件更加灵活。

获取本章代码 https://github.com/message163/react-course/tree/props 分支 `props`

例如我们在使用原生html标签时,我们可以为其传递属性，如下

```html
<img  width='500' height='500' alt='xxx' src='xxxxxxx'  />
```

那在React中，也允许将属性传递给自己编写的`组件` 如下

```tsx
export default function App(){
    return (<Card title='标题1' content='内容'></Card>)
}
```

## 父子组件通信

编写一个`子组件` Test

```tsx
const Test = () => {
    return <div>Test</div>
}
export default Test 
```

在App.tsx 引入该子组件

```tsx
import Test from "./components/Test"
function App() {
  return (
    <>
      <Test></Test>
    </>
  )
}

export default App
```
### 1. 父向子组件传递 props

支持的类型如下：

- string  `title={'测试'}`
- number `id={1}`
- boolean `isGirl={false}`
- null  `empty={null}`
- undefined  `empty={undefined}`
- object  `obj={ { a: 1, b: 2 } }`
- array  `arr={[1, 2, 3]}`
- function `cb={(a: number, b: number) => a + b}`
- JSX.Element `element={<div>测试</div>}`

```tsx
function App() {
  return (
    <>
      <Test
        title={'测试'}
        id={1}
        obj={{ a: 1, b: 2 }}
        arr={[1, 2, 3]}
        cb={(a: number, b: number) => a + b}
        empty={null}
        element={<div>测试</div>}
        isGirl={false}
      >
      </Test>
    </>
  )
}
```

子组件接受父组件传递的props

props是一个对象，会作为函数的第一个参数接受传过来的props值

**`注意：我们需要遵守单向数据流，子组件不能直接修改父组件的props`**

在React源码中会使用`Object.freeze`冻结props，限制props的修改。

Object.freeze() 静态方法可以使一个对象被冻结。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。被冻结的对象不能再被更改：不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定

```tsx
import React from "react"
interface Props {
    title: string
    id: number
    obj: {
        a: number
        b: number
    }
    arr: number[]
    cb: (a: number, b: number) => number
    empty: null
    element: JSX.Element
}

const Test:React.FC<Props> = (props) => {
    console.log(props)
    return <div>Test</div>
}

export default Test 
```
### 2.定义默认值

#### 第一种方式

将属性变为可选的这儿使用`title`举例 `title?: string`

然后将props进行解构，定义默认值 `{title = '默认标题'}`

```tsx
import React from "react"
interface Props {
    title?: string
    id: number
    obj: {
        a: number
        b: number
    }
    arr: number[]
    cb: (a: number, b: number) => number
    empty: null
    element: JSX.Element
}

const Test:React.FC<Props> = ({title = '默认标题'}) => {
    return <div>Test</div>
}

export default Test 
```
#### 第二种方式

使用`defaultProps`进行默认值赋值，最后把defaultProps 和 props 合并，注意顺序要先写defaultProps，再写props 因为props会覆盖defaultProps的值。

```tsx
import React from "react"
interface Props {
    title?: string
    id: number
    obj: {
        a: number
        b: number
    }
    arr: number[]
    cb: (a: number, b: number) => number
    empty: null
    element: JSX.Element
}

const defaultProps: Partial<Props> = {
    title: '默认标题',
}

const Test: React.FC<Props> = (props) => {
    const { title } = { ...defaultProps, ...props }
    return <div>{title}</div>
}

export default Test 
```

### 3. React.FC

React.FC是函数式组件，是在TS使用的一个范型。FC是Function Component的缩写

React.FC 帮助我们自动推导Props的类型。

>注意：在旧版本的React.FC是包含`PropsWithChildren`这个声明新版本已经没有了

### 3.props.children 特殊值

这个功能类似于Vue的插槽，直接在子组件内部插入标签会自动一个参数`props.children`

```tsx
function App() {
  return (
    <>
      <Test>
        <div>123</div>
      </Test>
    </>
  )
}
```

子组件使用children属性

在之前的版本children是不需要手动定义的，在18之后改为需要手动定义类型

这样就会把父级的 `<div>123</div>` 插入子组件的 `<div>` 里面

```tsx
import React from "react"
interface Props {
    children: React.ReactNode //手动声明children
}

const Test: React.FC<Props> = (props) => {
    return <div>{props.children}</div>
}

export default Test 
```

#### 4.子组件给父组件传值

React没有像Vue那样的emit派发事件，所有我们回调函数模拟emit派发事件

父组件传递`函数`过去,其本质就是录用函数的回调

```tsx
import Test from "./components/Test"
function App() {
  const fn = (params:string) => {
    console.log('子组件触发了 父组件的事件',params)
  }
  return (
    <>
      <Test callback={fn}></Test>
    </>
  )
}
```

子组件接受函数，并且在对应的事件调用函数，回调参数回去

```tsx
import React from "react"
interface Props {
    callback: (params: string) => void
    children?: React.ReactNode
}

const Test: React.FC<Props> = (props) => {
    return <div>
        <button onClick={() => props.callback('我见过龙')}>派发事件</button>
    </div>
}

export default Test 
```

## 兄弟组件通信

定义两个组件放到一起作为兄弟组件，其原理就是`发布订阅`设计模式，发布订阅已经讲过无数次了这里不在阐述，原生浏览器已经实现了这个模式我们可以直接使用。

如果不想使用原生浏览器，可以使用`mitt`

mitt文档 https://www.npmjs.com/package/mitt

```tsx
import Card from "./components/Card"
import Test from "./components/Test"
function App() {

  return (
    <>
      <Test></Test>
      <Card></Card>
    </>
  )
}

export default App
```

第一个兄弟组件 定义事件模型

```tsx
import React from "react"
const Test: React.FC = (props) => {
    const event = new Event('on-card') //添加到事件中心
    const clickTap = () => {
        console.log(event)
        event.params = { name: '我见过龙' }
        window.dispatchEvent(event) //派发事件
    }
    return <div>
        <button onClick={clickTap}>派发事件</button>
    </div>
}
//扩充event类型
declare global {
    interface Event {
        params: any
    }
}

export default Test 
```

第二个兄弟组件接受事件

```tsx
import './index.css'
export default function Test2() {
    //接受参数
    window.addEventListener('on-card', (e) => {
        console.log(e.params, '触发了')
    })

    return <div className="card"></div>
}
```