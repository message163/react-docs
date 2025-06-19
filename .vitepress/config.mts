import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
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
          { text: '组件实战', link: '/components/practice' },
          { text: '高阶组件', link: '/components/hoc' }
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
      },
      {
        text: 'Router',
        items: [
          {
            text: '基本使用',
            items: [
              { text: '安装', link: '/router/install' },
              { text: '模式', link: '/router/mode' },
              { text: '路由', link: '/router/router' },
              { text: '传参', link: '/router/params' },
              { text: '懒加载', link: '/router/lazy' },
              { text: '操作', link: '/router/operation' },
              { text: '导航', link: '/router/nav' },
              { text: '边界处理', link: '/router/boundary' },
            ]
          },
          {
            text:'API',
            items:[
              { text: 'Await', link: '/router/apis/await' },
              { text: 'Link', link: '/router/apis/link' },
              { text: 'Meta', link: '/router/apis/meta' },
              { text: 'NavLink', link: '/router/apis/navlink' },
              { text: 'redirect', link: '/router/apis/redirect' },
              { text: 'ScrollRestoration ', link: '/router/apis/scrollRestoration' },
            ]
          },
          {
            text:'Hooks',
            items:[
              { text: 'useNavigate', link: '/router/hooks/useNavigate' },
              { text: 'useNavigation', link: '/router/hooks/useNavigation' },
              { text: 'useParams', link: '/router/hooks/useParams' },
              { text: 'useSearchParams', link: '/router/hooks/useSearchParams' },
              { text: 'useLocation', link: '/router/hooks/useLocation' },
              { text: 'useLoaderData', link: '/router/hooks/useLoaderData' },
              { text: 'useActionData', link: '/router/hooks/useActionData' },
              { text: 'useRouteError', link: '/router/hooks/useRouteError' },
              { text: 'useSubmit', link: '/router/hooks/useSubmit' },
            ]
          }
        ]
      },
      {
        text: 'Zustand',
        items: [
          { text: '安装', link: '/zustand/install' },
          { text: '状态处理', link: '/zustand/state' },
          { text: '状态简化', link: '/zustand/simplify' },
          { text: '中间件', link: '/zustand/middleware' },
          { text: '订阅', link: '/zustand/subscribe' },
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
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  rewrites: {
    'self-media/index.md': 'self-media.md'
  }
}))
