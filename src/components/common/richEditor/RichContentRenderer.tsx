import "./suneditor-content.css";
import "katex/dist/katex.min.css";

import { removeInlineStyles } from "@/lib/utils/common.util";
import { twMerge } from "tailwind-merge";

interface RichContentRendererProps {
  content: string;
  className?: string;
}

function RichContentRenderer({ content, className }: RichContentRendererProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: removeInlineStyles(content, ["background-color"]),
      }}
      className={twMerge("sun-editor-editable", className)}
    ></div>
  );
}

export default RichContentRenderer;
