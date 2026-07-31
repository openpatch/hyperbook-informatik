---
name: CSS
lang: de
---

# CSS

**CSS** (Cascading Style Sheets) legt fest, wie :t[HTML]{#html} dargestellt wird. Eine Regel besteht aus einem **Selektor** und einem **Deklarationsblock**:

```css
h1 {
  color: darkred;
  font-size: 2rem;
}
```

Treffen mehrere Regeln dasselbe Element, entscheidet die **Kaskade**: zuerst die Spezifität (id vor Klasse vor Elementname), bei Gleichstand die spätere Regel.

Eigenschaften, die mit Text zu tun haben, **vererben** sich im :t[DOM]{#dom} nach unten – Eigenschaften der Box nicht.
