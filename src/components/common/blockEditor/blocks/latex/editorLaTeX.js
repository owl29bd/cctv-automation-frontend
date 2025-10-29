import "katex/dist/katex.min.css";
import "./editorLaTeX.css";

import katex from "katex";

const MathIcon = `<svg
    stroke-linejoin="round"
    stroke-linecap="round"
    stroke-width="2"
    stroke="#000000"
    fill="none"
    viewBox="0 0 24 24"
    height="512px"
    width="512px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 7V4H6l6 8-6 8h12v-3" />
  </svg>`;

const InlineMathIcon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M7 12.75V11.25H9.38563L10.7931 6.00266C10.797 5.98811 10.8013 5.97377 10.806 5.95965L10.8102 5.94389L10.8146 5.92986C11.1634 4.81245 12.2058 4 13.44 4C14.9588 4 16.19 5.23122 16.19 6.75C16.19 6.91899 16.1747 7.08506 16.1451 7.24669L16.1396 7.2767L15.8408 8.39079L14.392 8.0022L14.6741 6.9505C14.6845 6.88564 14.69 6.81871 14.69 6.75C14.69 6.05964 14.1304 5.5 13.44 5.5C12.8852 5.5 12.413 5.86199 12.2504 6.36445L10.9394 11.25H12V12.75H10.5368L9.48551 16.6678L9.48495 16.6699L9.41212 16.9414C9.4089 16.9535 9.4054 16.9653 9.40164 16.977L9.38363 17.0435L9.38013 17.0549C9.03607 18.1802 7.98975 19 6.75 19C5.23122 19 4 17.7688 4 16.25C4 15.8992 4.08642 15.5956 4.14978 15.373L4.16503 15.3192L4.30629 14.7925L4.38192 14.5349L5.8212 14.9573L5.75052 15.1981L5.6104 15.7206C5.53143 16.0018 5.5 16.1153 5.5 16.25C5.5 16.9404 6.05964 17.5 6.75 17.5C7.30821 17.5 7.78276 17.1335 7.94256 16.6264L8.03671 16.2792L8.03726 16.2772L8.98331 12.75H7Z"
      fill="#1F2328"
    />
    <path
      d="M20.0002 17.75L18.9396 18.8107L16.9699 16.841L15.0002 18.8107L13.9396 17.75L15.9093 15.7803L13.9396 13.8107L15.0002 12.75L16.9699 14.7197L18.9396 12.75L20.0002 13.8107L18.0306 15.7803L20.0002 17.75Z"
      fill="#1F2328"
    />
  </svg>`;

// Extracted common class names into constants
const MATH_BLOCK_INPUT = "math-block-input";
const MATH_BLOCK_INPUT_ACTIVE = "math-block-input-active";

export class MathTex {
  /**
   * Default placeholder for Math Tool
   *
   * @return {string}
   * @constructor
   */
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }

  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: MathData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-Math",
      showClick: "show-click",
    };

    this.onKeyUp = this.onKeyUp.bind(this);

    this._placeholder = config.placeholder
      ? config.placeholder
      : MathTex.DEFAULT_PLACEHOLDER;
    this._data = {};
    this._element = this.drawView();

    this.config = {
      output: "html",
      delimiter: "$$",
      throwOnError: true,
    };

    this.data = data;
  }

  /**
   * Check if text content is empty and set empty string to inner html.
   * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
   *
   * @param {KeyboardEvent} e - key up event
   */
  onKeyUp(e) {
    const { textContent } = this._element;

    this.renderKatex();

    if (e.code !== "Backspace" && e.code !== "Delete") {
      return;
    }

    if (textContent === "") {
      this._element.innerHTML = "";
    }
  }

  /**
   * Change block editing state - rendering Katex or being editable
   */
  onClick(e) {
    if (!this.textNode || !this.katexNode || e.target === this.textNode) return;

    this.textNode.classList.add(MATH_BLOCK_INPUT_ACTIVE);
    this.textNode.focus();

    const inputError = this.katexNode.innerText.indexOf("ParseError") > -1;
    if (this.textNode.hidden == true && inputError) {
      katex.render(this.textBeforeError, this.katexNode, this.config);
    }
  }

  /**
   * switch the block to editable mode
   */
  enableEditing() {
    this.textNode = document.createElement("input");
    this.textNode.classList.add(MATH_BLOCK_INPUT);
    this.textNode.placeholder = "c = \\pm\\sqrt{a^2 + b^2}";

    this.textNode.addEventListener("blur", () => {
      this.textNode.classList.remove(MATH_BLOCK_INPUT_ACTIVE);
    });

    this._element.appendChild(this.textNode);
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    const div = document.createElement("DIV");

    div.classList.add(this._CSS.wrapper, this._CSS.block);
    div.contentEditable = true;
    div.dataset.placeholder = this._placeholder;
    this.katexNode = document.createElement("div");
    this.katexNode.id = "katex-node";
    this.katexNode.contentEditable = false;
    div.appendChild(this.katexNode);

    div.addEventListener("keyup", this.onKeyUp);
    return div;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    this.renderKatex();
    if (!this.readOnly) {
      this.enableEditing();
      this._element.classList.add(this._CSS.showClick);
    }
    this._element.addEventListener("click", (e) => this.onClick(e));
    return this._element;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   */
  renderKatex() {
    this.data.text = this.textNode ? this.textNode.value : this.data.text;
    this.textToKatex();
  }

  /**
   * parsing the current text to Tex syntax if it has not been transformed
   */
  textToKatex() {
    if (!this.katexNode) return;

    if (!this.data.text) {
      this.katexNode.innerHTML = "Add KaTeX here";
      this.katexNode.style.color = "gray";
      return;
    }

    this.katexNode.style.color = "black";

    if (this._element.innerText.indexOf("ParseError") < 0) {
      this.textBeforeError = this._element.innerText;
    }

    try {
      katex.render(this.data.text, this.katexNode, this.config);
    } catch (e) {
      const errorMsg = "Invalid Equation. " + e.toString();
      this.katexNode.innerText = errorMsg;
    }
  }

  /**
   * content inside Math is unchangeable.
   * @param {MathData} data
   * @public
   */
  merge(data) {
    this.data = this.data;
  }

  /**
   * Validate Math block data:
   * - check for emptiness
   *
   * @param {MathData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(savedData) {
    if (savedData.text?.trim() === "") {
      return false;
    }

    return true;
  }

  /**
   * content inside Math is unchangeable
   * @param {HTMLDivElement} toolsContent - Math tools rendered view
   * @returns {MathData} - saved data
   * @public
   */
  save(toolsContent) {
    return {
      text: this.data.text,
    };
  }

  /**
   * On paste callback fired from Editor.
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(event) {
    const data = {
      text: event.detail.data.innerHTML,
    };

    this.data = data;
  }

  /**
   * Enable Conversion Toolbar. Math can be converted to/from other tools
   */
  static get conversionConfig() {
    return {
      export: "text", // to convert Math to other block, use 'text' property of saved data
      import: "text", // to covert other block's exported string to Math, fill 'text' property of tool data
    };
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      text: {
        br: true,
        svg: true,
      },
    };
  }

  /**
   * Get current Tools`s data
   * @returns {MathData} Current data
   * @private
   */
  get data() {
    return this._data;
  }

  /**
   * Store data in plugin:
   * - at the this._data property
   * - at the HTML
   *
   * @param {MathData} data — data to set
   * @private
   */
  set data(data) {
    this._data = data || {};

    this.katexNode.innerHTML = this._data.text || "";
  }

  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {{tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ["P"],
    };
  }

  /**
   * Icon and title for displaying at the Toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: MathIcon,
      title: "Equation",
    };
  }
}

/**
 * Inline Code Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
export class InlineMath {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return "inline-math";
  }

  /**
   */
  constructor({ api }) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|null}
     */
    this.button = null;

    /**
     * Tag represented the term
     *
     * @type {string}
     */
    this.tag = "MATH";

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };

    this.config = {
      output: "html",
      delimiter: "$$",
      throwOnError: false,
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  static get isInline() {
    return true;
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(
      this.tag,
      InlineMath.CSS,
    );

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range) {
    /**
     * Create a wrapper for highlighting
     */
    const div = document.createElement(this.tag);

    div.classList.add(InlineMath.CSS);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(span);
     */
    div.appendChild(range.extractContents());
    const text = div.innerText;

    div.setAttribute("data-math", text);

    const span = document.createElement("span");

    katex.render(text, span, this.config);

    div.replaceChildren(span);

    div.addEventListener("click", (e) => {
      e.stopPropagation();

      this.unwrap(div);
    });

    range.insertNode(div);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(div);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper) {
    /**
     * Expand selection to all term-tag
     */

    this.api.selection.expandToTag(termWrapper);

    const text = termWrapper.getAttribute("data-math");

    let sel = window.getSelection();

    let range = sel.getRangeAt(0);

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range.insertNode(document.createTextNode(text));

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, InlineMath.CSS);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return InlineMathIcon;
  }

  /**
   * Sanitizer rule
   * @return {{span: {class: string}}}
   */
  static get sanitize() {
    return {
      code: {
        class: InlineMath.CSS,
      },
    };
  }
}
