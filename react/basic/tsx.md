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
  const num: number = 333
  const fn = () => 'test'
  return (
    <>
      {'11' /** 字符串用法 */}
      {num /** 变量用法 */}
      {fn() /** 函数用法 */}
      {new Date().getTime() /** 日期用法 */}
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
//绑定多个class(className)
function App() {
  const a:string = 'A'
  return (
    <>
      <div className={`${a} class2`}>{value}</div>
    </>
  )
}
//绑定样式style
function App() {
  const styles = { color: 'red' }
  return (
    <>
      <div style={styles}>test</div>
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

- tsx如何渲染html代码片段(dangerouslySetInnerHTML)

dangerouslySetInnerHTML 的值是一个对象，该对象包含一个名为 __html 的属性，且值为你想要插入的 HTML 字符串
```tsx
function App() {
  const value: string = '<section style="color:red">小满</section>'
  return (
    <>
        <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  )
}
```

- tsx如何遍历dom元素

使用map遍历返回html标签即可

```tsx
function App() {
  const arr: string[] = ["小满","中满","大满"]
  return (
    <>
        {
            arr.map((item) => {
                return <div>{item}</div>
            })
        }
    </>
  )
}
```

- tsx如何编写条件语句

使用三元表达式就可以了

```tsx
function App() {
  const flag:boolean = true
  return (
    <>
        {
           flag ? <div>真的</div> : <div>假的</div>
        }
    </>
  )
}
```

- tsx注意事项

**{}插值语句内不允许编写`switch` `if` `变量声明` 或者直接放入`对象本体`**

下面展示错误用法正确用法对比

```tsx
//错误用法
function App() {
  const obj = { name: '小满' }
  return (
    <>
      {obj}
    </>
  )
}
//正确用法
function App() {
  const obj = { name: '小满' }
  return (
    <>
      {obj.name}
      {JSON.stringify(obj)}
    </>
  )
}
```

```tsx
//错误用法
function App() {
  const flag:boolean = true
  return (
    <>
       {
        if(flag){
          <p>1</p>
        }else{
          <p>2</p>
        }
       }
    </>
  )
}
//正确用法
function App() {
  const flag:boolean = true
  return (
    <>
       {
        flag ? <div>1</div> : <div>2</div>
       }
    </>
  )
}
```