import DefaultTheme from 'vitepress/theme'
import FrontierCards from './components/FrontierCards.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('FrontierCards', FrontierCards)
  }
}
