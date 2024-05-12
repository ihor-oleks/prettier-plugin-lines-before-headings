# Prettier Lines Before Headings

A prettier plugin to add blank lines before Markdown headings for better readability.


## Install

```sh
npm install --save-dev prettier-plugin-lines-before-headings
```

```sh
pnpm add --save-dev prettier-plugin-lines-before-headings
```

```sh
yarn add --dev prettier-plugin-lines-before-headings
```


## Usage

```json
{
  "tabWidth": 2,
  "trailingComma": "none",
  "linesBeforeHeadings": 2,
  "plugins": ["prettier-plugin-lines-before-headings"]
}
```


## API


### `linesBeforeHeadings`

**type**: `number`

**default**: `1`

How many lines to add before Markdown headings.

```
"linesBeforeHeadings": 2,
```
