# Markdown Editor Quick Reference

## Toolbar Buttons Reference

### Text Formatting

- **[B]** Bold - Wraps selected text in `**text**`
- **[I]** Italic - Wraps selected text in `*text*`

### Headings

- **[H1]** Level 1 Heading - Adds `# ` before text
- **[H2]** Level 2 Heading - Adds `## ` before text
- **[H3]** Level 3 Heading - Adds `### ` before text

### Lists

- **[•]** Bullet List - Adds `- ` before text
- **[1.]** Numbered List - Adds `1. ` before text

### Links & Code

- **[🔗]** Link - Prompts for URL, creates `[text](url)`
- **[<>]** Code Block - Wraps in triple backticks
- **["]** Quote - Adds `> ` before text

### Preview

- **[👁]** Toggle Preview - Shows/hides live Markdown rendering

---

## Markdown Syntax Quick Reference

### Headings

```
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting

```
**bold text**
*italic text*
```

### Lists

```
Unordered:
- Item 1
- Item 2
- Item 3

Ordered:
1. First item
2. Second item
3. Third item
```

### Links

```
[Display Text](https://example.com)
```

### Code

```
Inline: `code here`

Block:
```

function example() {
return "code block";
}

```

```

### Quotes

```
> This is a blockquote
> It can span multiple lines
```

### Horizontal Rule

```
---
```

---

## Advanced Features (GFM)

### Tables

```
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Task Lists

```
- [x] Completed task
- [ ] Incomplete task
```

### Strikethrough

```
~~crossed out text~~
```

---

## Tips for Best Results

1. **Use Preview**: Toggle preview frequently to verify formatting
2. **Combine Methods**: Use toolbar for quick formatting, manual syntax for precision
3. **Code Blocks**: Specify language for syntax highlighting:
   ```typescript
   interface User {
     name: string;
   }
   ```
4. **Links**: Always include https:// in URLs
5. **Lists**: Add blank line before/after lists for proper rendering

---

## Keyboard Shortcuts (Editor)

- **Tab** - Insert 2 spaces (or continue list)
- **Ctrl/Cmd + A** - Select all
- **Ctrl/Cmd + C** - Copy
- **Ctrl/Cmd + V** - Paste
- **Ctrl/Cmd + Z** - Undo
- **Ctrl/Cmd + Shift + Z** - Redo

---

## Example Blog Post

````markdown
# Introduction to TypeScript

TypeScript is a **strongly typed** programming language that builds on JavaScript, giving you better tooling at any scale.

## Why TypeScript?

TypeScript adds additional syntax to JavaScript to support a _tighter integration_ with your editor. Here are the key benefits:

- Type safety at compile time
- Better IDE support
- Improved code documentation
- Easier refactoring

## Getting Started

1. Install TypeScript globally
2. Create a new project
3. Configure tsconfig.json

### Basic Example

```typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 30,
};

console.log(`Hello, ${user.name}!`);
```
````

> **Note**: TypeScript compiles to clean, readable JavaScript that runs anywhere JavaScript runs.

Learn more at [TypeScript Official Website](https://www.typescriptlang.org)

---

## Conclusion

TypeScript brings **type safety** and modern features to JavaScript development, making it easier to build large-scale applications with confidence.

```

---

## Rendered Output Preview

The above Markdown will render with:
- Large, bold, uppercase heading for "Introduction to TypeScript"
- Properly formatted subheadings
- Bold and italic text where specified
- Clean bulleted and numbered lists
- Syntax-highlighted TypeScript code block
- Styled blockquote with purple left border
- Clickable link in purple theme color
- Horizontal rule separator

All styling automatically matches your existing design system!
```
