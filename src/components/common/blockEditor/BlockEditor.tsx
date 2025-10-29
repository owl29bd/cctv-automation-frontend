import "katex/dist/katex.min.css";
import "./blockEditor.css";

import EditorJS, { EditorConfig, OutputData } from "@editorjs/editorjs";
import { useEffect, useRef } from "react";

import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import { blockEditorTools } from "./blockEditorTools";

interface BlockEditorProps extends EditorConfig {
  reinitOnPropsChange?: boolean;
  onData?: (data: OutputData) => void;
}

export default function BlockEditor(props: BlockEditorProps) {
  const { reinitOnPropsChange, holder, onData, ...config } = props;
  const editorRef = useRef<EditorJS | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const initEditor = async () => {
    const holderNode = holder || nodeRef.current;

    if (!holderNode) {
      throw new Error("No node to append Editor.js");
    }

    editorRef.current = new EditorJS({
      ...config,
      holder: holderNode,
      //@ts-ignore
      tools: blockEditorTools,
      onChange: handleChange,
      onReady: () => {
        new Undo({ editor: editorRef?.current });
        new DragDrop(editorRef?.current);
      },
    });
  };

  const removeEditor = async () => {
    if (editorRef.current) {
      try {
        await editorRef.current.isReady;
        editorRef.current.destroy();
        editorRef.current = null;
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return false;
  };

  const handleChange = async () => {
    if (onData) {
      emitDataEvent(onData);
    }
  };

  const emitDataEvent = async (cb: (data: OutputData) => void) => {
    try {
      const output = await editorRef.current?.save();
      if (output) {
        cb(output);
      }
    } catch (error) {
      console.error("Saving failed: ", error);
    }
  };

  useEffect(() => {
    initEditor();
    return () => {
      removeEditor();
    };
  }, []);

  useEffect(() => {
    if (reinitOnPropsChange) {
      (async () => {
        const removed = await removeEditor();
        if (removed) {
          initEditor();
        }
      })();
    }
  }, [reinitOnPropsChange, config]);

  if (!holder) {
    return <div ref={nodeRef} />;
  }

  return null;
}
