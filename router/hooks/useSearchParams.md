# useSearchParams

`useSearchParams` 是一个 React-router 的钩子函数，用于获取当前 URL 的搜索参数，也就是 `?` 后面的参数。

## 使用

返回一个包含当前 URL 搜索参数的 `URLSearchParams` 对象。

```tsx
import { useSearchParams } from 'react-router'

function SomeComponent() {
  let [searchParams, setSearchParams] = useSearchParams()
}
```
例如当前 URL 为 `http://localhost:5173/search?name=张三&age=18`

```tsx
// 获取当前 URL 的搜索参数
let [searchParams, setSearchParams] = useSearchParams()
console.log(searchParams.get('name')) // 张三
console.log(searchParams.get('age')) // 18
//修改当前 URL 的搜索参数
<button onClick={() => setSearchParams(prev => {
    prev.set('age','30');
    prev.set('name','小满zs');
    return prev;
})}>change</button>
//修改完成之后的 URL 为 `http://localhost:5173/search?age=30&name=小满zs`
```



## 类型

```ts
function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams];

type ParamKeyValuePair = [string, string];

type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: : NavigateOptions
) => void;

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}
```


