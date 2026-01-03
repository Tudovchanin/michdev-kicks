// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Добавлено правило для настройки поведения self-closing тегов в Vue-шаблонах
  rules: {
    "vue/html-self-closing": ["error", {
      html: {
        void: "always",    // void-элементы (например, <input>) должны быть self-closing
        normal: "never",   // обычные HTML-теги (например, <div>) не должны быть self-closing
        component: "always" // Vue-компоненты должны быть self-closing, если пустые
      },
      svg: "always",
      math: "always"
    }],
  }
})
