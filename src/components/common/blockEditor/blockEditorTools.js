import { InlineMath, MathTex } from "./blocks/latex/editorLaTeX";

import { toBase64 } from "@/lib/utils/fileUtils";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import Warning from "@editorjs/warning";
import Strikethrough from "@sotaproject/strikethrough";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";

// import Image from '@editorjs/image'

export const blockEditorTools = {
  alignmentTune: {
    class: AlignmentTuneTool,
  },

  underline: {
    class: Underline,
    shortcut: "CMD+SHIFT+U",
  },

  strikethrough: Strikethrough,

  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },

  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C",
  },

  inlineMath: InlineMath,

  paragraph: {
    class: Paragraph,
    tunes: ["alignmentTune"],
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+P",
  },

  header: {
    class: Header,
    tunes: ["alignmentTune"],
    inlineToolbar: true,
    config: {
      placeholder: "Header",
    },
    shortcut: "CMD+SHIFT+H",
  },

  list: {
    class: List,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+L",
  },

  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },

  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
    shortcut: "CMD+SHIFT+O",
  },

  raw: Raw,

  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: async (file) => {
          const url = await toBase64(file);

          return {
            success: 1,
            file: { url },
          };
        },
        uploadByUrl: async (url) => {
          return {
            success: 1,
            file: { url },
          };
        },
      },
    },
  },

  warning: Warning,

  code: {
    class: Code,
    shortcut: "CMD+SHIFT+C",
  },

  delimiter: Delimiter,

  embed: Embed,

  table: {
    class: Table,
    inlineToolbar: true,
    shortcut: "CMD+ALT+T",
  },

  Math: MathTex,
};
