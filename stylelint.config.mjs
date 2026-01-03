
// stylelint.config.js
export default   {
  // Расширяем стандартный конфиг для SCSS с базовыми правилами
  extends: "stylelint-config-standard-scss",

  // Подключаем плагин для контроля порядка CSS-свойств
  plugins: ["stylelint-order"],

  // Переопределения для специфичных файлов
  overrides: [
    {
      // Для всех Vue компонентов
      files: ["**/*.vue"],

      // Используем парсер, который умеет извлекать стили из <style> в .vue файлах
      customSyntax: "postcss-html",
    },
  ],

  rules: {
    // Правило, задающее порядок CSS-свойств

"order/properties-order": [
  // 1. Специфические свойства (обычно для псевдоэлементов)
  "content",
  "quotes",

  // 2. Позиционирование
  "position",
  "z-index",
  "top",
  "right",
  "bottom",
  "left",

  // 3. Отображение и Box Alignment (Flexbox/Grid)
  "display",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "gap",
  "row-gap",
  "column-gap",
  "align-content",
  "align-items",
  "align-self",
  "justify-content",
  "justify-items",
  "justify-self",
  "place-content",
  "place-items",
  "place-self",
  "order",

  // 4. Блочная модель (Размеры и внешние границы)
  "box-sizing",
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "overflow",
  "overflow-x",
  "overflow-y",
  "object-fit",
  "object-position",

  // 5. Типографика
  "font",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "font-display",
  "line-height",
  "letter-spacing",
  "text-align",
  "text-decoration",
  "text-indent",
  "text-transform",
  "text-overflow",
  "white-space",
  "word-break",
  "color",

  // 6. Оформление (Границы, Фон, Визуал)
  "background",
  "background-color",
  "background-image",
  "background-repeat",
  "background-position",
  "background-size",
  "background-clip",
  "border",
  "border-top",
  "border-right",
  "border-bottom",
  "border-left",
  "border-width",
  "border-style",
  "border-color",
  "border-radius",
  "box-shadow",
  "opacity",
  "visibility",
  "filter",
  "backdrop-filter",
  "clip-path",

  // 7. Интерактивность и Анимация
  "cursor",
  "pointer-events",
  "user-select",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "animation",
  "animation-name",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-play-state",
  "animation-timing-function",
  "transform",
  "transform-origin",
  "will-change"
],
    // Отключаем ошибку пустого файла стилей
    "no-empty-source": null,

    "media-feature-range-notation": "prefix",

    "selector-class-pattern": "^[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$",
    "length-zero-no-unit": true,

    "color-function-alias-notation": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "hue-degree-notation": null,
    "custom-property-empty-line-before": null,
  }
  
};


