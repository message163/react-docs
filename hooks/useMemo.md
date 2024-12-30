# useMemo

`useMemo` 是 React 提供的一个性能优化 Hook。它的主要功能是避免在每次渲染时执行复杂的计算和对象重建。通过记忆上一次的计算结果，仅当依赖项变化时才会重新计算，提高了性能，有点类似于Vue的`computed`。

## React.memo

`React.memo` 是一个 React API，用于优化性能。它通过记忆上一次的渲染结果，仅当 props 发生变化时才会重新渲染, 避免重新渲染。

## 用法

使用 `React.memo` 包裹组件`[一般用于子组件]`，可以避免组件重新渲染。

```jsx
import React, { memo } from 'react';
const MyComponent = React.memo(({ prop1, prop2 }) => {
  // 组件逻辑
});
const App = () => {
  return <MyComponent prop1="value1" prop2="value2" />;
};
```

###  React.memo 案例

首先明确 React 组件的渲染条件：

1. 组件的 props 发生变化
2. 组件的 state 发生变化
3. useContext 发生变化

::: tip
我们来看下面这个例子，这个例子没有使用 `memo` 进行缓存，所以每次父组件的 state 发生变化，子组件都会重新渲染。

>而我们的子组件只用到了 user 的信息，但是父组件每次 search 发生变化，子组件也会重新渲染, 这样就就造成了没必要的渲染所以我们使用 `memo` 缓存。
:::

```tsx
import React, { useMemo, useState } from 'react';
interface User {
   name: string;
   age: number;
   email: string;
}
interface CardProps {
   user: User;
}
const Card = function ({ user }: CardProps) { // [!code --]
const Card = React.memo(function ({ user }: CardProps) { // [!code ++]
   console.log('Card render'); // 每次父组件的 state 发生变化，子组件都会重新渲染
   const styles = {
      backgroundColor: 'lightblue',
      padding: '20px',
      borderRadius: '10px',
      margin: '10px'
   }
   return <div style={styles}>
      <h1>{user.name}</h1>
      <p>{user.age}</p>
      <p>{user.email}</p>
   </div>
} // [!code --]
}) // [!code ++]
function App() {
   const [users, setUsers] = useState<User>({
      name: '张三',
      age: 18,
      email: 'zhangsan@example.com'
   });
   const [search, setSearch] = useState('');
   return (
      <div>
         <h1>父组件</h1>
         <input value={search} onChange={(e) => setSearch(e.target.value)} />
         <Card user={users} />
      </div>
   );
}

export default App;
```

::: tip
当我们使用 `memo` 缓存后，只有 user 发生变化时，子组件才会重新渲染, 而 search 发生变化时，子组件不会重新渲染。
:::

```tsx
import React, { useMemo, useState } from 'react';
interface User {
   name: string;
   age: number;
   email: string;
}
interface CardProps {
   user: User;
}
const Card = React.memo(function ({ user }: CardProps) {
   console.log('Card render');
   const styles = {
      backgroundColor: 'lightblue',
      padding: '20px',
      borderRadius: '10px',
      margin: '10px'
   }
   return <div style={styles}>
      <h1>{user.name}</h1>
      <p>{user.age}</p>
      <p>{user.email}</p>
   </div>
})
function App() {
   const [users, setUsers] = useState<User>({
      name: '张三',
      age: 18,
      email: 'zhangsan@example.com'
   });
   const [search, setSearch] = useState('');
   return (
      <div>
         <h1>父组件</h1>
         <input value={search} onChange={(e) => setSearch(e.target.value)} />
         <div>
            <button onClick={() => setUsers({
               name: '李四',
               age: Math.random() * 100,
               email: 'lisi@example.com'
            })}>更新user</button>
         </div>
         <Card user={users} />
      </div>
   );
}

export default App;
```

## React.memo 总结

1. **使用场景**：
   - 当子组件接收的 props 不经常变化时
   - 当组件重新渲染的开销较大时
   - 当需要避免不必要的渲染时

2. **优点**：
   - 通过记忆化避免不必要的重新渲染
   - 提高应用性能
   - 减少资源消耗

3. **注意事项**：
   - 不要过度使用，只在确实需要优化的组件上使用
   - 对于简单的组件，使用 `memo` 的开销可能比重新渲染还大
   - 如果 props 经常变化， `memo` 的效果会大打折扣


## useMemo 用法

```tsx
import React, { useMemo, useState } from 'react';
const App = () => {
   const [count, setCount] = useState(0);
   const memoizedValue = useMemo(() => count, [count]);
   return <div>{memoizedValue}</div>;
}
```

### 参数

入参

- 回调函数:Function：返回需要缓存的值
- 依赖项:Array：依赖项发生变化时，回调函数会重新执行`(执行时机跟useEffect类似)`

返回值

- 返回值：返回需要缓存的值`(返回之后就不是函数了)`


### useMemo 案例

::: tip
我们来看下面这个例子，这个例子没有使用 `useMemo` 进行缓存，所以每次 search 发生变化， `total` 都会重新计算，这样就造成了没必要的计算所以我们可以使用 `useMemo` 缓存，因为我们的 `total` 跟 `search` 没有关系，那么如果计算的逻辑比较复杂，就造成了性能问题。
:::

```tsx
import React, { useMemo, useState } from 'react';

function App() {
   const [search, setSearch] = useState('');
   const [goods, setGoods] = useState([
      { id: 1, name: '苹果', price: 10, count: 1 },
      { id: 2, name: '香蕉', price: 20, count: 1 },
      { id: 3, name: '橘子', price: 30, count: 1 },
   ]);
   const handleAdd = (id: number) => {
      setGoods(goods.map(item => item.id === id ? { ...item, count: item.count + 1 } : item));
   }
   const handleSub = (id: number) => {
      setGoods(goods.map(item => item.id === id ? { ...item, count: item.count - 1 } : item));
   }
   const total = () => {
      console.log('total');
      //例如很复杂的计算逻辑
      return goods.reduce((total, item) => total + item.price * item.count, 0)
   }
   return (
      <div>
         <h1>父组件</h1>
         <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
         <table border={1} cellPadding={5} cellSpacing={0}>
            <thead>
               <tr>
                  <th>商品名称</th>
                  <th>商品价格</th>
                  <th>商品数量</th>
               </tr>
            </thead>
            <tbody>
               {goods.map(item => <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price * item.count}</td>
                  <td>
                     <button onClick={() => handleAdd(item.id)}>+</button>
                     <span>{item.count}</span>
                     <button onClick={() => handleSub(item.id)}>-</button>
                  </td>
               </tr>)}
            </tbody>
         </table>
         <h2>总价：{total()}</h2>
      </div>
   );
}

export default App;
```

::: tip
当我们使用 `useMemo` 缓存后，只有 goods 发生变化时， `total` 才会重新计算, 而 search 发生变化时， `total` 不会重新计算。
:::

```tsx
import React, { useMemo, useState } from 'react';

function App() {
   const [search, setSearch] = useState('');
   const [goods, setGoods] = useState([
      { id: 1, name: '苹果', price: 10, count: 1 },
      { id: 2, name: '香蕉', price: 20, count: 1 },
      { id: 3, name: '橘子', price: 30, count: 1 },
   ]);
   const handleAdd = (id: number) => {
      setGoods(goods.map(item => item.id === id ? { ...item, count: item.count + 1 } : item));
   }
   const handleSub = (id: number) => {
      setGoods(goods.map(item => item.id === id ? { ...item, count: item.count - 1 } : item));
   }
   const total = useMemo(() => {
      console.log('total');
      return  goods.reduce((total, item) => total + item.price * item.count, 0)
   }, [goods]);
   return (
      <div>
         <h1>父组件</h1>
         <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
         <table border={1} cellPadding={5} cellSpacing={0}>
            <thead>
               <tr>
                  <th>商品名称</th>
                  <th>商品价格</th>
                  <th>商品数量</th>
               </tr>
            </thead>
            <tbody>
               {goods.map(item => <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price * item.count}</td>
                  <td>
                     <button onClick={() => handleAdd(item.id)}>+</button>
                     <span>{item.count}</span>
                     <button onClick={() => handleSub(item.id)}>-</button>
                  </td>
               </tr>)}
            </tbody>
         </table>
         <h2>总价：{total}</h2>
      </div>
   );
}

export default App;
```

## useMemo 执行时机(依赖项)

1. 如果依赖项是个空数组，那么 `useMemo` 的回调函数会执行一次
2. 指定依赖项，当依赖项发生变化时， `useMemo` 的回调函数会执行
3. 不指定依赖项，不推荐这么用，因为每次渲染和更新都会执行


## useMemo 总结

1. **使用场景**：
   - 当需要缓存复杂计算结果时
   - 当需要避免不必要的重新计算时
   - 当计算逻辑复杂且耗时时

2. **优点**：
   - 通过记忆化避免不必要的重新计算
   - 提高应用性能
   - 减少资源消耗

3. **注意事项**：
   - 不要过度使用，只在确实需要优化的组件上使用
   - 如果依赖项经常变化，useMemo 的效果会大打折扣
   - 如果计算逻辑简单，使用 useMemo 的开销可能比重新计算还大

