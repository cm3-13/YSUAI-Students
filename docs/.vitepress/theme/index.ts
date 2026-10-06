import DefaultTheme from 'vitepress/theme'
import FrontierCards from './components/FrontierCards.vue'
import TechAnimation from './components/TechAnimation.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FrontierCards', FrontierCards)
    app.component('TechAnimation', TechAnimation)
  }
}
