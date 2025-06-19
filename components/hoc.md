# HOC(Higher Order Component) 高阶组件

什么是高阶组件？

高阶组件就是一个组件，它接受另一个组件作为参数，并返回一个新的组件，（如果你学过Vue的话，跟Vue中的二次封装组件有点类似）新的组件可以复用旧组件的逻辑，并可以添加新的功能。常用于类组件中，虽然目前都是hooks写法会缩小HOC的使用场景，但还是有部分场景会用到`(因为人是死的，代码是活的，要灵活变通)🤡`。

## 入门级用法

**注意点**

- HOC不会修改传入的组件，而是使用组合的方式，通过将原组件包裹在一个容器组件中来实现功能扩展
- 注意避免多层嵌套，一般HOC的嵌套层级不要超过3层
- HOC的命名规范：`with`开头，如`withLoading`、`withAuth`等

**代码示例**

我们以一个权限判断的例子来入门HOC，并且可以灵活的复用这个逻辑。

```tsx
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
const withAuthorization = (role: Role) => (Component: React.FC) => {
  // 判断是否具有权限的函数
  const isAuthorized = (role: Role) => {
    return role === Role.ADMIN;
  }
  return (props: any) => {
    // 判断是否具有权限
    if (isAuthorized(role)) {
      //把props透传给组件
      return <Component {...props} />
    } else {
      // 没有权限则返回一个提示
      return <div>抱歉，您没有权限访问该页面</div>
    }
  }
}

const AdminPage = withAuthorization(Role.ADMIN)(() => {
  return <div>管理员页面</div> //有权限输出
})

const UserPage = withAuthorization(Role.USER)(() => {
  return <div>用户页面</div> //没有权限不输出
})
```

## 进阶用法

封装一个通用的HOC，用于处理各种图表,比如柱状图、折线图、饼图等，因为很多配置都是重复的，所以可以封装成一个通用的HOC。

```sh
npm i echarts
```