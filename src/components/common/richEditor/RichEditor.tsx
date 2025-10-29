/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import "katex/dist/katex.min.css";
import "./suneditor-content.css";
import "./suneditor.css";

import { forwardRef, useEffect, useRef } from "react";

import katex from "katex";
import SunEditor from "suneditor";
import SunEditorCore from "suneditor/src/lib/core";
import { SunEditorOptions } from "suneditor/src/options";
import plugins from "suneditor/src/plugins";
import { buttonListResponsive } from "./buttonList";

export type IRichEditor = SunEditorCore;

export interface IRichEditorProps extends SunEditorOptions {
  defaultValue?: string;
  inlineStyle?: { [key: string]: string | number };
}

const RichEditor = forwardRef<IRichEditor | null, IRichEditorProps>(
  (
    {
      buttonList = buttonListResponsive,
      inlineStyle = { "border-width": "0px 1px 1px 1px" },
      minHeight = "50vh",
      maxHeight = "80vh",
      height = "auto",
      defaultValue = "",
      ...rest
    },
    ref,
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const defaultStyle = Object.keys(inlineStyle).reduce(
        (acc, key) => `${acc}${key}:${inlineStyle[key]};`,
        "",
      );

      const editor = SunEditor.create(textAreaRef.current!, {
        plugins,
        buttonList,
        katex,
        placeholder: "Start writing here...",
        defaultStyle: "font-size:16px;" + defaultStyle,
        showPathLabel: false,
        display: "block",
        popupDisplay: "full",
        fontSize: [18, 20, 22, 24, 26, 28, 36, 48, 72],
        formats: ["p", "div", "pre", "h1", "h2", "h3"],
        imageFileInput: false,
        height,
        minHeight,
        maxHeight,
        charCounterLabel: "Characters :",
        value: defaultValue ?? "",
        ...rest,
      });

      if (ref) {
        if (typeof ref === "function") {
          ref(editor);
        } else {
          ref.current = editor;
        }
      }

      return () => {
        editor.destroy();
      };
    }, []);

    return <textarea ref={textAreaRef} style={{ visibility: "hidden" }} />;
  },
);

RichEditor.displayName = "RichEditor";

export default RichEditor;
