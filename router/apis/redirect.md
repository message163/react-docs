# redirect

redirect 是用于重定向，通常用于`loader`中，当`loader`返回`redirect`的时候，会自动重定向到`redirect`指定的路由。


## 案例以及用法

权限验证，例如这个路由需要登录才能访问，如果未登录则重定向到登录页。

```tsx
import { redirect } from "react-router";
{
  path: "/home",
  loader: async ({request}) => {
    const isLogin = await checkLogin();
    if(!isLogin) return redirect('/login');
    return {
        data: 'home'
    }
  }
} 
```




