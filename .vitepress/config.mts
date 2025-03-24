import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "react docs",
  base: "/react-docs/",
  outDir: "./docs",
  description: "this is react docs for xiaoman",
  head: [
    ['link', { rel: 'icon', href: '/react.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local',
    },
    lastUpdated: {
      text: '更新时间',
    },
    outline: {
      label: '文章目录',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/basic/introduce' },
      { text: '自媒体', link: '/self-media' }
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: 'React基本介绍', link: '/basic/introduce' },
          { text: 'React开发环境搭建', link: '/basic/development' },
          { text: 'tsx语法入门', link: '/basic/tsx' },
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'Babel', link: '/tools/babel' },
          { text: 'Swc', link: '/tools/swc' },
        ]
      },
      {
        text: '原理',
        items: [
          { text: 'vdom fiber diff', link: '/principle/vdom' },
          { text: 'requestidlecallback', link: '/principle/requestidlecallback' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: '认识组件', link: '/components/base' },
          { text: '组件通信', link: '/components/communication' },
          { text: '受控组件', link: '/components/controlled' },
          { text: '传送组件', link: '/components/createPortal' },
          { text: '异步组件', link: '/components/suspense' },
          { text: '组件实战', link: '/components/practice' }
        ]
      },
      {
        text: 'css方案',
        items: [
          { text: 'css modules', link: '/css/css-modules' },
          { text: 'css in js', link: '/css/css-in-js' },
          { text: 'css 原子化', link: '/css/css-atomic' }
        ]
      },
      {
        text: 'Hooks',
        items: [
          {
            text: '数据驱动',
            items: [
              { text: 'useState', link: '/hooks/useState' },
              { text: 'useReducer', link: '/hooks/useReducer' },
              { text: 'useSyncExternalStore', link: '/hooks/useSyncExternalStore' },
              { text: 'useTransition', link: '/hooks/useTransition' },
              { text: 'useDeferredValue', link: '/hooks/useDeferredValue' }
            ]
          },
          {
            text: '副作用',
            items: [
              { text: 'useEffect', link: '/hooks/useEffect' },
              { text: 'useLayoutEffect', link: '/hooks/useLayoutEffect' },
              { text: 'useInsertionEffect', link: '/hooks/useInsertionEffect' }
            ]
          },
          {
            text: '状态传递',
            items: [
              { text: 'useRef', link: '/hooks/useRef' },
              { text: 'useImperativeHandle', link: '/hooks/useImperativeHandle' },
              { text: 'useContext', link: '/hooks/useContext' },
            ]
          },
          {
            text: '状态派生',
            items: [
              { text: 'useMemo', link: '/hooks/useMemo' },
              { text: 'useCallback', link: '/hooks/useCallback' }
            ],
          },
          {
            text: '工具Hooks',
            items: [
              { text: 'useDebugValue', link: '/hooks/useDebugValue' },
              { text: 'useId', link: '/hooks/useId' }
            ]
          },
          {
            text: '其他',
            items: [
              { text: '自定义hooks', link: '/hooks/custom' },
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/message163/react-docs.git' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright ©2025-present xiaoman'
    }
  },
  markdown: {
    lineNumbers: true
  },
  rewrites: {
    'self-media/index.md': 'self-media.md'
  }
})
