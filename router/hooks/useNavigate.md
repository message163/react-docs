# useNavigate

`useNavigate` 是一个 React-router 的钩子，用于编程式导航，的路由跳转。

例如倒计时结束后，自动返回跳转等,因为这种操作属于逻辑性操作，这时候组件方式的跳转就不合适了，这时候就需要使用编程式跳转。

```tsx
import { useNavigate } from 'react-router';

const navigate = useNavigate();
setTimeout(() => {
    navigate('/home');
}, 1000);
```

## 参数

跟Link组件的参数类似

- 第一个参数: to跳转的路由 `navigate(to)`
- 第二个参数: options配置对象 `navigate(to,options)`
    - replace: 是否替换当前路由
    - state: 传递的数据
    - relative: 相对路径
    - preventScrollReset: 是否阻止滚动重置

### to

```tsx
import { useNavigate } from 'react-router'; // 导入useNavigate
const navigate = useNavigate(); // 获取navigate函数
navigate('/home'); // 跳转路由
```

### options-replace
跳转页面的时候，是否替换当前路由
```tsx
navigate('/home',{replace:true});
```

### options-state
传递数据，在跳转的页面中使用通过`useLocation`的state属性获取    
```tsx
navigate('/home',{state:{name:'张三'}});
```

### options-relative
跳转的方式，默认是绝对路径，如果想要使用相对路径，需要设置为`relative:'path'`

`具体细节查看`[link-relative](../apis/link.md)
```tsx
navigate('/home',{relative:'path'});
```

### options-preventScrollReset
跳转页面的时候，是否阻止滚动重置

`具体细节查看`[link-preventScrollReset](../apis/link.md)
```tsx
navigate('/home',{preventScrollReset:true});
```

### options-viewTransition
跳转页面的时候，是否启用视图过渡,自动增加页面跳转的动画效果。
```tsx
navigate('/home',{viewTransition:true});
```







