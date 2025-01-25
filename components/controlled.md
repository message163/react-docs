# React 受控组件理解和应用

## React 受控组件

受控组件一般是指表单元素，表单的数据由React的 State 管理，更新数据时，需要手动调用setState()方法，更新数据。因为React没有类似于Vue的v-model，所以需要自己实现绑定事件。


### 那为什么需要使用受控组件呢？

使用受控组件可以确保表单数据与组件状态同步、便于集中管理和验证数据，同时提供灵活的事件处理机制以实现数据格式化和UI联动效果。

### 案例

我们在界面的输入框中输入内容，这时候你会发现这个value是只读的，无法修改，还会报错

`hook.js:608 You provided a value prop to a form field without an onChange handler. This will render a read-only field. If the field should be mutable use defaultValue. Otherwise, set either onChange or readOnly. Error Component Stack`

```tsx
import React, { useState } from 'react';

const App: React.FC = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <input type="text" value={value} />
      <div>{value}</div>
    </>
  );
}

export default App;
```
当用户输入内容的时候，value并不会自动更新，这时候就需要我们手动实现一个onChange事件来更新value。


```tsx
import React, { useState } from 'react';

const App: React.FC = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <div>{value}</div>
    </>
  );
}

export default App;
```
其实就是实现了一个类似Vue的v-model的机制，通过onChange事件来更新value，这样就实现了受控组件。

:::tip
受控组件适用于所有表单元素，包括input、textarea、select等。但是除了input type="file" 外，其他表单元素都推荐使用受控组件。
:::


## React 非受控组件

非受控组件指的是该表单元素不受React的State管理，表单的数据由DOM管理。通过useRef()来获取表单元素的值。

### 请看VCR

我们使用defaultValue来设置表单的默认值，但是你要想实时获取值，就需要使用useRef()来获取表单元素的值。跟操作DOM一样。

```tsx
import React, { useState,useRef } from 'react';
const App: React.FC = () => {
  const value = '小满'
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = () => {
    console.log(inputRef.current?.value)
  }
  return (
    <>
      <input type="text" onChange={handleChange} defaultValue={value} ref={inputRef} />
    </>
  );
}

export default App;
```


## 特殊的表单File

对于file类型的表单控件，它是一个特殊的组件，因为它的值只能由用户通过文件选择操作来设置，而不能通过程序直接设置。这使得它在React中的处理方式与其他表单元素有所不同。

### 请看VCR

如果非要把file类型设置为受控组件，他就会就行报错

`hook.js:608 A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info:`

报错内容大致为：

:::danger
一个组件正在将一个未受控的输入控件改为受控的。这可能是由于值从未定义变为已定义，这应该不会发生。在组件的生命周期内，决定使用受控还是未受控的输入控件。
:::

```tsx
import React, { useState } from 'react';
const App: React.FC = () => {
  const [files,setFiles] = useState<File | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files?.[0]!)
  }
  return (
    <>
      <input type="file" value={files} onChange={handleChange} />
    </>
  );
}

export default App;
```

修改为非受控组件

```tsx
import React, { useRef } from 'react';
const App: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = () => {
    console.log(inputRef.current?.files)
  }
  return (
    <>
      <input type="file" ref={inputRef} onChange={handleChange} />
    </>
  );
}

export default App;
```
