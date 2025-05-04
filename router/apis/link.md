# Link

`Link`组件是一个用于导航到其他页面的组件，他会被渲染成一个特殊的`<a>`标签，跟传统a标签不同的是，他不会刷新页面，而是会通过router管理路由。

## 使用

```tsx
import { Link } from "react-router";

export default function App() {
  return (
    <Link to="/about">About</Link>
  )
}
```

## 参数

- `to`：要导航到的路径
- `replace`：是否替换当前路径
- `state`：要传递给目标页面的状态
- `relative`：相对于当前路径的导航方式
- `reloadDocument`：是否重新加载页面
- `preventScrollReset`：是否阻止滚动位置重置
- `viewTransition`：是否启用视图过渡

### to

`to` 属性是一个字符串，表示要导航到的路径。

```tsx
<Link to="/about">About</Link>
```

### replace

`replace` 属性是一个布尔值，表示是否替换当前路径，如果为`true`，则导航不会在浏览器历史记录中创建新的条目，而是替换当前条目。

```tsx
<Link replace to="/about">About</Link>
```

### state

`state` 属性是一个对象，可以把参数传递给目标页面。

```tsx
<Link state={{ from: "home" }} to="/about">About</Link>

// 在目标页面获取状态
import { useLocation } from "react-router";

export default function App() {
  const location = useLocation();
  console.log(location.state);
  return <div>Location: {location.state.from}</div>;
}
```

### relative

`relative` 属性是一个字符串，表示相对于当前路径的导航方式，默认的方式是绝对路径，如果想要使用相对路径，可以设置为`path`。

```tsx
//默认是绝对路径
<Link relative="route" to="/about">About</Link>

//使用相对路径
<Link relative="path" to="../about">About</Link>

//例如当前的路由是/index/home，那么使用绝对路径导航到/about，会变成/about
<Link to="/about">About</Link>
//可以使用相对路径导航到/index/about
<Link relative="path" to="../about">About</Link>
```

### reloadDocument

`reloadDocument` 属性是一个布尔值，表示是否重新加载页面。

```tsx
<Link reloadDocument to="/about">About</Link>
```

### preventScrollReset

`preventScrollReset` 属性是一个布尔值，表示是否阻止滚动位置重置。

```tsx
<Link preventScrollReset to="/about">About</Link>
```

![如图](../image/scroll.gif)


### viewTransition

`viewTransition` 属性是一个布尔值，表示是否启用视图过渡，自动增加页面跳转的动画效果。

```tsx
<Link viewTransition to="/about">About</Link>
```

