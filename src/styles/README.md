# CSS Organization Structure

This directory contains centralized CSS/SCSS files for the project.

## Structure

- `global/` - Global styles, resets, and theme variables
- `components/` - Component-specific styles  
- `containers/` - Container/page-specific styles
- `utils/` - Utility classes and mixins

## Usage

Import styles in your components:

```tsx
import '../../styles/components/button.css';
```

Or use CSS classes:

```tsx
<button className="btn btn-primary">Click me</button>
```

## Note

The existing inline styles and style objects can be gradually migrated to this centralized structure.
Existing SCSS files in `src/assets/scss/` should also be referenced or migrated here.
