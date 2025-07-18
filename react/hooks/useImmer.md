# useImmer

![useImmer](./img/immer-logo.svg)

## 概述

`useImmer` 是基于 [immer](https://immerjs.github.io/immer/) 库实现的一个 React Hook，它让你可以像修改可变数据一样来修改不可变数据。immer 是一个不可变的数据结构库，完全符合 React 的不可变性原则。

### 核心特性

- 🚀 **简化状态更新**：无需手动创建不可变更新
- 🛡️ **类型安全**：完整的 TypeScript 支持
- ⚡ **性能优化**：只在真正需要时创建新对象
- 🎯 **直观语法**：像修改可变数据一样编写代码

## 安装

```bash
npm install immer use-immer
```


## API 参考

### useImmer

```typescript
function useImmer<S>(initialState: S | (() => S)): [S, (f: (draft: Draft<S>) => void | S) => void]
```

**参数：**
- `initialState`: 初始状态值或返回初始状态的函数

**返回值：**
- `state`: 当前状态
- `setState`: 更新状态的函数

### useImmerReducer

```typescript
function useImmerReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & InitializerArg<R>,
  initializer?: (arg: I & InitializerArg<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>]
```

## 使用指南

### 1. 处理嵌套对象

`useImmer` 在处理深层嵌套对象时特别有用，无需手动展开每一层：

```tsx
import { useImmer } from 'use-immer'

interface User {
  name: string
  age: number
  profile: {
    avatar: string
    bio: string
    preferences: {
      theme: 'light' | 'dark'
      notifications: boolean
    }
  }
}

export default function UserProfile() {
  const [user, setUser] = useImmer<User>({
    name: '大满zs',
    age: 25,
    profile: {
      avatar: '/avatar.jpg',
      bio: '前端开发者',
      preferences: {
        theme: 'light',
        notifications: true
      }
    }
  })

  const updateTheme = () => {
    setUser(draft => {
      draft.profile.preferences.theme = 'dark'
    })
  }

  const updateBio = (newBio: string) => {
    setUser(draft => {
      draft.profile.bio = newBio
    })
  }

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>年龄: {user.age}</p>
      <p>个人简介: {user.profile.bio}</p>
      <p>主题: {user.profile.preferences.theme}</p>
      
      <button onClick={updateTheme}>切换主题</button>
      <button onClick={() => updateBio('热爱编程的开发者')}>
        更新简介
      </button>
    </div>
  )
}
```

### 2. 处理数组

数组操作变得异常简单，所有原生数组方法都可以直接使用：

```tsx
import { useImmer } from 'use-immer'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useImmer<Todo[]>([])

  const addTodo = (text: string) => {
    setTodos(draft => {
      draft.push({
        id: Date.now(),
        text,
        completed: false
      })
    })
  }

  const toggleTodo = (id: number) => {
    setTodos(draft => {
      const todo = draft.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    })
  }

  const removeTodo = (id: number) => {
    setTodos(draft => {
      const index = draft.findIndex(t => t.id === id)
      if (index > -1) {
        draft.splice(index, 1)
      }
    })
  }

  const clearCompleted = () => {
    setTodos(draft => {
      return draft.filter(todo => !todo.completed)
    })
  }

  return (
    <div className="todo-list">
      <h2>待办事项 ({todos.length})</h2>
      
      <div className="add-todo">
        <input 
          type="text" 
          placeholder="添加新待办..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              addTodo(e.currentTarget.value.trim())
              e.currentTarget.value = ''
            }
          }}
        />
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>

      {todos.some(t => t.completed) && (
        <button onClick={clearCompleted}>清除已完成</button>
      )}
    </div>
  )
}
```

### 3. 处理基本类型

对于基本类型，`useImmer` 的行为与 `useState` 完全一致：

```tsx
import { useImmer } from 'use-immer'

export default function Counter() {
  const [count, setCount] = useImmer(0)
  const [isVisible, setIsVisible] = useImmer(true)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="counter">
      {isVisible && (
        <>
          <h2>计数器: {count}</h2>
          <div className="controls">
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
            <button onClick={reset}>重置</button>
          </div>
        </>
      )}
      <button onClick={toggleVisibility}>
        {isVisible ? '隐藏' : '显示'}计数器
      </button>
    </div>
  )
}
```

## useImmerReducer 使用

`useImmerReducer` 结合了 `useReducer` 和 immer 的优势，让 reducer 函数更加简洁：

```tsx
import { useImmerReducer } from 'use-immer'

interface State {
  count: number
  history: number[]
  isLoading: boolean
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_TO_HISTORY' }

const initialState: State = {
  count: 0,
  history: [],
  isLoading: false
}

function counterReducer(draft: State, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      draft.count += 1
      break
    case 'DECREMENT':
      draft.count -= 1
      break
    case 'RESET':
      draft.count = 0
      break
    case 'SET_LOADING':
      draft.isLoading = action.payload
      break
    case 'ADD_TO_HISTORY':
      draft.history.push(draft.count)
      break
  }
}

export default function AdvancedCounter() {
  const [state, dispatch] = useImmerReducer(counterReducer, initialState)

  const handleIncrement = () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // 模拟异步操作
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' })
      dispatch({ type: 'ADD_TO_HISTORY' })
      dispatch({ type: 'SET_LOADING', payload: false })
    }, 500)
  }

  return (
    <div className="advanced-counter">
      <h2>高级计数器</h2>
      
      <div className="display">
        <span>当前值: {state.count}</span>
        {state.isLoading && <span className="loading">加载中...</span>}
      </div>

      <div className="controls">
        <button 
          onClick={handleIncrement}
          disabled={state.isLoading}
        >
          增加
        </button>
        <button 
          onClick={() => dispatch({ type: 'DECREMENT' })}
          disabled={state.isLoading}
        >
          减少
        </button>
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          disabled={state.isLoading}
        >
          重置
        </button>
      </div>

      {state.history.length > 0 && (
        <div className="history">
          <h3>历史记录:</h3>
          <ul>
            {state.history.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```



## 与 useState 的对比

| 特性 | useState | useImmer |
|------|----------|----------|
| 基本类型 | ✅ 简单直接 | ✅ 相同体验 |
| 对象更新 | ❌ 需要手动展开 | ✅ 直接修改 |
| 数组操作 | ❌ 需要创建新数组 | ✅ 使用原生方法 |
| 嵌套更新 | ❌ 复杂且易错 | ✅ 简单直观 |
| 性能 | ✅ 优秀 | ✅ 优秀（immer 优化） |

## 注意事项

1. **不要直接修改 draft 外的对象**：immer 只能追踪在 draft 函数内的修改
2. **返回值处理**：如果更新函数返回一个值，它会替换整个状态
3. **异步操作**：在异步回调中使用 setState 时要注意闭包问题

## 总结

`useImmer` 是一个强大的状态管理工具，特别适合处理复杂的状态结构。它让不可变更新变得简单直观，同时保持了 React 的性能优势。无论是简单的计数器还是复杂的表单状态，`useImmer` 都能提供优雅的解决方案。

## 相关链接

- [immer 官方文档](https://immerjs.github.io/immer/)
- [use-immer GitHub](https://github.com/immerjs/use-immer)
- [React 不可变性指南](https://react.dev/learn/updating-objects-in-state)
- [手写简易版immer](../zustand/state.md#immer-原理剖析)