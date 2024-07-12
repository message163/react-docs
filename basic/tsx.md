# tsx语法入门

## FAQ

#### tsx跟jsx有什么区别

答: 基本没有没有区别只是在jsx语法上增加了类型。


#### jsx是什么？

答：jsx是js的语法扩展，允许在js中编写html代码。

例如：`const fn = () => <div>小满是谁？没听说过</div>`

## 语法编写

- 使用tsx绑定变量`{value}`

>绑定class需要用className

```tsx
function App() {
  const value:string = '小满'
  return (
    <>
      <div>{value}</div>
    </>
  )
}
//绑定class(className) id 属性等等 都是一样的
function App() {
  const value:string = 'A'
  return (
    <>
      <div data-index={value} className={value} id={value}>{value}</div>
    </>
  )
}
```

- 使用tsx绑定事件`on[Click]{fn}`小驼峰 其他事件也是一样的

```tsx
function App() {
  const value: string = '小满'
  const clickTap = (params: string) => console.log(params)
  return (
    <>
      <div onClick={() => clickTap(value)}>{value}</div>
    </>
  )
}
```

- tsx如何使用泛型

正常写泛型语法会跟tsx语法冲突，他会把泛型理解成是一个元素，解决方案后面加一个,即可

```tsx
function App() {
  const value: string = '小满'
  const clickTap = <T,>(params: T) => console.log(params)
  return (
    <>
      <div onClick={() => clickTap(value)}>{value}</div>
    </>
  )
}
```