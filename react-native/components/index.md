# React Native 基础组件

## 核心组件

### View
最基础的容器组件，类似于 HTML 中的 div。

```jsx
import { View } from 'react-native';

<View style={{ flex: 1, backgroundColor: 'white' }}>
  <Text>Hello World</Text>
</View>
```

### Text
用于显示文本的组件。

```jsx
import { Text } from 'react-native';

<Text style={{ fontSize: 16, color: 'black' }}>
  Hello React Native
</Text>
```

### Image
用于显示图片的组件。

```jsx
import { Image } from 'react-native';

<Image 
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
/>
```

### ScrollView
可滚动的容器组件。

```jsx
import { ScrollView } from 'react-native';

<ScrollView style={{ flex: 1 }}>
  <Text>Scrollable content</Text>
</ScrollView>
```

### TouchableOpacity
可点击的组件，带有透明度效果。

```jsx
import { TouchableOpacity } from 'react-native';

<TouchableOpacity onPress={() => alert('Pressed!')}>
  <Text>Click me</Text>
</TouchableOpacity>
```

## 常用组件

- **FlatList**: 高性能列表组件
- **TextInput**: 文本输入组件
- **Button**: 按钮组件
- **Switch**: 开关组件
- **Modal**: 模态框组件 