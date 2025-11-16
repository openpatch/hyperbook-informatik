# Web Component Development Guidelines

When developing a web component for our project, please adhere to the following guidelines:

Put it in the folder /public/wc. Also use the following color variables for styling, but be sure to have a good contrast between text and background:

```css
--color-brand: "#007864";
--color-brand-text: "white";
--color-background: white;
--color-text: black;
--color-text-deactivated: #242428;
--color-nav: #f5f5f5;
--color-nav-border: #3c3c3c;
--color-author-background: #d6d6d6;
--color-author-color: #3c3c3c;
--color-spacer: #a4a4a4;
```

You can use shades of these colors as well. But try to calculate them from the base colors above to ensure consistency.

These variables change deponding on the theme (light or dark). You see their default values above.

The web component should also work on touch devices.

Do not create a demo.html. Instead update the /book/wc.md file to document the web component. Follow the existing format in wc.md.

Sometimes the web components are used on mobile devices with small screens. Make sure your component works well on small screens too.

Do not set a custom font. The web component should use the font defined by the main project.

Always use german text for any labels, instructions, or messages in the web component.
