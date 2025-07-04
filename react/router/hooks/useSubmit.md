# useSubmit

`useSubmit` 是一个 React-router 的钩子函数，用于提交表单。

## 使用


:::tip
默认情况下，`useSubmit` 会提交 formData 数据，如果需要提交其他数据，可以通过 `submit` 的第二个参数传递。
:::

1. 提交formData数据

```tsx
import { useSubmit } from "react-router";
const formData = new FormData();
formData.append("email", "test@test.com");
formData.append("password", "123456");
const submit = useSubmit();
submit(formData);
```

2. 提交json数据

```tsx
import { useSubmit } from "react-router";
const submit = useSubmit();
submit(JSON.stringify({ email: "test@test.com", password: "123456" }), {
  method: "POST",
  encType: "application/json",
});
```

3. 提交text数据

```tsx
import { useSubmit } from "react-router";
const submit = useSubmit();
submit("test", { method: "POST", encType: "text/plain" });
```

4. 提交urlencoded数据

```tsx
import { useSubmit } from "react-router";
const submit = useSubmit();
submit({ email: "test@test.com", password: "123456" }, { method: "POST", encType: "application/x-www-form-urlencoded" });
```

5. 提交queryString数据

```tsx
import { useSubmit } from "react-router";
const submit = useSubmit();
submit([["email", "test@test.com"], ["password", "123456"]], { method: "POST"});
```
