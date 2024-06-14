import {
  AstPath,
  Doc,
  format,
  type Parser,
  type ParserOptions,
  type Plugin,
  Printer,
  type SupportOptions
} from "prettier";
import {parsers as markdownParsers} from "prettier/plugins/markdown";

const HEADINGS = new RegExp(/((?<![([].*)#+.*)(?=[^`]*(?:`[^`]*`[^`]*)*$)/g);

const getPlugins = (language: string, options: ParserOptions): Plugin[] => {
  const plugins = options.plugins.filter((plugin) => typeof plugin !== "string") as Plugin[];
  return plugins.filter((plugin) => plugin.languages?.some((lang) => lang.name === language));
};

export const options: SupportOptions = {
  linesBeforeHeadings: {
    category: "Global",
    type: "int",
    default: 1,
    description: "How many lines to add before headings"
  }
};

export const printers: {[astFormat: string]: Printer} = {
  "lines-before-headings-ast": {
    print: (path: AstPath): Doc => {
      if (path.node?.type === "lines-before-headings") {
        return path.node.body;
      }
      throw new Error(`Unknown node type: ${path.node?.type}`);
    }
  }
};

export const parsers: {[parserName: string]: Parser} = {
  markdown: {
    ...markdownParsers.markdown,
    parse: async (text: string, options: ParserOptions) => {
      const lines: number = typeof options.linesBeforeHeadings === "number" ? options.linesBeforeHeadings : 1;
      const content = await format(text, {...options, plugins: getPlugins("markdown", options), endOfLine: "lf"});
      const body = lines > 1 ? content.replace(HEADINGS, `${"\n".repeat(lines - 1)}$1`).trimStart() : content;
      return {
        type: "lines-before-headings",
        body
      };
    },
    astFormat: "lines-before-headings-ast"
  },
  mdx: {
    ...markdownParsers.mdx,
    parse: async (text: string, options: ParserOptions) => {
      const lines: number = typeof options.linesBeforeHeadings === "number" ? options.linesBeforeHeadings : 1;
      const content = await format(text, {...options, plugins: getPlugins("mdx", options), endOfLine: "lf"});
      const body = lines > 1 ? content.replace(HEADINGS, `${"\n".repeat(lines - 1)}$1`).trimStart() : content;
      return {
        type: "lines-before-headings",
        body
      };
    },
    astFormat: "lines-before-headings-ast"
  }
};
