declare module "editorjs-drag-drop" {
  export default class DragDrop {
    constructor(editor: EditorJS);
  }
}

declare module "editorjs-undo" {
  export default class Undo {
    constructor(config: { editor: EditorJS });
  }
}
