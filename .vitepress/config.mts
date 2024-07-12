import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "react docs",
  base: "/react-docs/",
  outDir: "./docs",
  description: "this is react docs for xiaoman",
  themeConfig: {
    outline:{
     label: '文章目录',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/basic/introduce' }
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: 'React基本介绍', link: '/basic/introduce' },
          { text: 'React开发环境搭建', link: '/basic/development' },
          { text: 'tsx语法入门', link: '/basic/tsx' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/message163/react-docs.git' }
    ]
  }
})
