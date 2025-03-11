# @ror/styles

> Styles for the ROR Web applications

## Getting started

To install `@ror/styles` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @ror/styles
```

It uses
[Sass modules](https://css-tricks.com/introducing-sass-modules/) to organize the
codebase and provide exports to use.

A lot of styles are emitted as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties) or more commonly known as CSS variables.

If you're new to Sass, or are wondering how to configure Sass for your project,
we recommend checking out the following resources and links:

- [Sass Basics](https://sass-lang.com/guide)
- [Next.js with Sass](https://nextjs.org/docs/app/getting-started/css#sass)
- [Vite with Sass](https://vitejs.dev/guide/features.html#css-pre-processors)

## Usage

### Option 1: Using Sass modules (Recommended)

_Note: In order to compile the sass modules you need to install [Dart Sass](http://npmjs.com/package/sass)._

You can bring in all the styles for the ROR Styles system by including
`@ror/styles` in your Sass files. For example:

```scss
@use '@ror/styles';
```

Or import the different modules which provides the most flexibility, allowing you to import only what you need and customize variables.

```scss
@use '@ror/styles/scss/reset';
@use '@ror/styles/scss/components/button';
// Import other modules as needed
```

### Option 2: Using pre-compiled CSS

If you prefer not to configure Sass or need a quick implementation, you can use the pre-compiled CSS files directly:

```javascript
import '@ror/styles/css/index.css'; // Import all styles
import '@ror/styles/css/reset.css'; // Import only the reset
```
