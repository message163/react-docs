# useImperativeHandle

可以在子组件内部暴露给父组件`句柄`，那么说人话就是，父组件可以调用子组件的方法，或者访问子组件的属性。
如果你学过Vue，就类似于Vue的`defineExpose`。

## 用法

```ts
useImperativeHandle(ref, ()=>{
    return {
        // 暴露给父组件的方法或属性
    }
}, [deps])
```
## 参数

- ref: 父组件传递的ref对象
- createHandle: 返回值，返回一个对象，对象的属性就是子组件暴露给父组件的方法或属性
- deps?:[可选] 依赖项，当依赖项发生变化时，会重新调用createHandle函数，类似于`useEffect`的依赖项


## 入门案例

::: tip
useRef 在`18`版本 和 `19`版本使用方式不一样
:::

### 18版本

18版本需要配合`forwardRef`一起使用

forwardRef包装之后，会有两个参数，第一个参数是props，第二个参数是ref

我们使用的时候只需要将ref传递给`useImperativeHandle`即可，然后`useImperativeHandle` 就可以暴露子组件的方法或属性给父组件，
然后父组件就可以通过ref调用子组件的方法或访问子组件的属性

```tsx{12,13,14,15,16,17,18,19,37,38}
interface ChildRef {
   name: string
   count: number
   addCount: () => void
   subCount: () => void
}

//React18.2
const Child = forwardRef<ChildRef>((_, ref) => {
   const [count, setCount] = useState(0)
   //重点
   useImperativeHandle(ref, () => {
      return {
         name: 'child',
         count,
         addCount: () => setCount(count + 1),
         subCount: () => setCount(count - 1)
      }
   })
   return <div>
      <h3>我是子组件</h3>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
   </div>
})

function App() {
   const childRef = useRef<ChildRef>(null)
   const showRefInfo = () => {
      console.log(childRef.current)
   }
   return (
      <div>
         <h2>我是父组件</h2>
         <button onClick={showRefInfo}>获取子组件信息</button>
         <button onClick={() => childRef.current?.addCount()}>操作子组件+1</button>
         <button onClick={() => childRef.current?.subCount()}>操作子组件-1</button>
         <hr />
         <Child ref={childRef}></Child>
      </div>
   );
}

export default App;
```

### 19版本

1. 19版本不需要配合`forwardRef`一起使用，直接使用即可，他会把Ref跟props放到一起，你会发现变得更加简单了
2. 19版本useRef的参数改为必须传入一个参数例如`useRef<ChildRef>(null)`

```tsx
interface ChildRef {
   name: string
   count: number
   addCount: () => void
   subCount: () => void
}

//React19
const Child = forwardRef<ChildRef>((_, ref) => { // [!code --]
const Child = ({ ref }: { ref: React.Ref<ChildRef> }) => { // [!code ++]
   const [count, setCount] = useState(0)
   useImperativeHandle(ref, () => {
      return {
         name: 'child',
         count,
         addCount: () => setCount(count + 1),
         subCount: () => setCount(count - 1)
      }
   })
   return <div>
      <h3>我是子组件</h3>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
   </div>
}

function App() {
   const childRef = useRef<ChildRef>(null)
   const showRefInfo = () => {
      console.log(childRef.current)
   }
   return (
      <div>
         <h2>我是父组件</h2>
         <button onClick={showRefInfo}>获取子组件信息</button>
         <button onClick={() => childRef.current?.addCount()}>操作子组件+1</button>
         <button onClick={() => childRef.current?.subCount()}>操作子组件-1</button>
         <hr />
         <Child ref={childRef}></Child>
      </div>
   );
}

export default App;
```

## 执行时机[第三个参数]

1. 如果不传入第三个参数，那么`useImperativeHandle`会在组件挂载时执行一次，然后状态更新时，都会执行一次

```tsx
useImperativeHandle(ref, () => {
   
})
```

2. 如果传入第三个参数，并且是一个空数组，那么`useImperativeHandle`会在组件挂载时执行一次，然后状态更新时，不会执行
```tsx
useImperativeHandle(ref, () => {
   
}, [])
```

3. 如果传入第三个参数，并且有值，那么`useImperativeHandle`会在组件挂载时执行一次，然后会根据依赖项的变化，决定是否重新执行
```tsx
const [count, setCount] = useState(0)
useImperativeHandle(ref, () => {
   
}, [count])
```

## 实际案例

例如，我们封装了一个表单组件，提供了两个方法：校验和重置。使用`useImperativeHandle`可以将这些方法暴露给父组件，父组件便可以通过`ref`调用子组件的方法。

```tsx
interface ChildRef {
   name: string
   validate: () => string | true
   reset: () => void
}

const Child = ({ ref }: { ref: React.Ref<ChildRef> }) => {
   const [form, setForm] = useState({
      username: '',
      password: '',
      email: ''
   })
   const validate = () => {
      if (!form.username) {
         return '用户名不能为空'
      }
      if (!form.password) {
         return '密码不能为空'
      }
      if (!form.email) {
         return '邮箱不能为空'
      }
      return true
   }
   const reset = () => {
      setForm({
         username: '',
         password: '',
         email: ''
      })
   }
   useImperativeHandle(ref, () => {
      return {
         name: 'child',
         validate: validate,
         reset: reset
      }
   })
   return <div style={{ marginTop: '20px' }}>
      <h3>我是表单组件</h3>
      <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder='请输入用户名' type="text" />
      <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder='请输入密码' type="text" />
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='请输入邮箱' type="text" />
   </div>
}

function App() {
   const childRef = useRef<ChildRef>(null)
   const showRefInfo = () => {
      console.log(childRef.current)
   }
   const submit = () => {
      const res = childRef.current?.validate()
      console.log(res)
   }
   return (
      <div>
         <h2>我是父组件</h2>
         <button onClick={showRefInfo}>获取子组件信息</button>
         <button onClick={() => submit()}>校验子组件</button>
         <button onClick={() => childRef.current?.reset()}>重置</button>
         <hr />
         <Child ref={childRef}></Child>
      </div>
   );
}

export default App;
