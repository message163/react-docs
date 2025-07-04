# useRouteError

useRouteError是用于获取路由错误信息的hooks。


如果loader或action抛出错误，会调用ErrorBoundary组件。
```tsx
import { createBrowserRouter } from 'react-router'
import Error from '../layout/error'

const router = createBrowserRouter([
    {
        path: '/index',
        Component: Layout,
        children: [
            {
                path: 'home',
                Component: Home,
                loader: async () => {
                    throw {
                        message: 'Home Error',
                        status: 404,
                        statusText: 'Not Found',
                        data: '132131',
                    }
                },
                ErrorBoundary: Error,
            },
        ],
    },
    {
        path: '*',
        Component: NotFound,
    },
]);
```


在ErrorBoundary组件中，可以通过useRouteError获取到错误信息。

```tsx
import { useRouteError } from 'react-router'

export default function Error() {
    const error = useRouteError()
    return <div>{error.message}</div>
}
```

