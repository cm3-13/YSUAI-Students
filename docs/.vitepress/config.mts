import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';
import mathjax3 from 'markdown-it-mathjax3';

const vitePressOptions = {
  lang: "zh-CN",
  title: "YSU-AI",
  description: "燕山大学人工智能学院学生知识库与课程攻略平台",
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('mjx-'),
      },
    },
  },
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/博客简介' },
      { text: '贡献指南', link: '/贡献指南' },
      { text: 'GitHub', link: 'https://github.com/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ]
  }
};

const vitePressSidebarOptions = {
  documentRootPath: '/docs',
  collapsed: true,
  collapseDepth: 2,
  capitalizeFirst: true,
  sortMenusOrderNumericallyFromTitle: true,
  sortMenusOrderByDescending: false,
  removePrefixAfterOrdering: true,
  prefixSeparator: '-',
  debugPrint: true
};

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions)
)