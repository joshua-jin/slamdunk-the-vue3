(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{330:function(e,n,t){"use strict";t.r(n);var s=t(33),a=Object(s.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("p",[e._v("这里主要讲讲 parse ，看看 Vue 怎么对模板进行初步的解析。 在 compile 中调用 baseParse 进行 parse，所以这里先看看 baseParse 。")]),e._v(" "),t("p",[e._v("在解析之前，会创建一个上下文，用于保存当前解析进度和一些配置项。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("export function baseParse(\n  content: string,\n  options: ParserOptions = {}\n): RootNode {\n  const context = createParserContext(content, options)\n  const start = getCursor(context)\n  return createRoot(\n    parseChildren(context, TextModes.DATA, []),\n    getSelection(context, start)\n  )\n}\n")])])]),t("p",[e._v("options 中基本是用 parseOptions 传下来的 options 进行覆盖， column 表示第几行， line 表示第几列， offset 表示传入 content 的偏差，originalSource 表示原始字符串，在 parse 不会被修改，source 一开始代表原始字符串，在 parse 过程会被裁剪， inPre 表示是否在 pre 标签里面，inVPre 表示是否在 VPre 标签里面。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function createParserContext(\n  content: string,\n  options: ParserOptions\n): ParserContext {\n  return {\n    options: {\n      ...defaultParserOptions,\n      ...options\n    },\n    column: 1,\n    line: 1,\n    offset: 0,\n    originalSource: content,\n    source: content,\n    inPre: false,\n    inVPre: false\n  }\n}\n")])])]),t("p",[e._v("回到 baseParse，创建完 context 之后，我们首先获取一开始的字符串的坐标。 getCursor 返回当前的 行、列、偏差。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function getCursor(context: ParserContext): Position {\n  const { column, line, offset } = context\n  return { column, line, offset }\n}\n")])])]),t("p",[e._v("然后在调用 createRoot 返回根节点的 ast 之前，使用 parseChildren 对模板进行解析。一开始的 TextModes 为DATA，正如我们在 compiler 里面曾经说过，不同的 TextModes 会影响解析。 从下面可以看出，DATA 可以包含 Elements、 Entities ，结束的标志是在 tags 栈中找到 关闭 tag，而对于 RCDATA，不包含  Elements，包含Entities， 结束的标志是 tags 栈上一级有关闭 tag， 一般处于 textarea，RAWTEXT 不包含  Elements 和Entities，结束的标志页数是 tags 栈上一级有关闭 tag，一般位于 style 和 script 内。可能在这里单独讲概念有点懵，后面结合解析过程来会加深理解。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("export const enum TextModes {\n  //          | Elements | Entities | End sign              | Inside of\n  DATA, //    | ✔        | ✔        | End tags of ancestors |\n  RCDATA, //  | ✘        | ✔        | End tag of the parent | <textarea>\n  RAWTEXT, // | ✘        | ✘        | End tag of the parent | <style>,<script>\n  CDATA,\n  ATTRIBUTE_VALUE\n}\nparseChildren(context, TextModes.DATA, [])\n")])])]),t("p",[e._v("需要注意的是，对于 Dom 平台来说，对于 DOMNamespaces.HTML,包括在 iframe 和 noscript 标签里面，RCDATA 还包括 title。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const isRawTextContainer = /*#__PURE__*/ makeMap(\n  'style,iframe,script,noscript',\n  true\n)\ngetTextMode({ tag, ns }: ElementNode): TextModes {\n    if (ns === DOMNamespaces.HTML) {\n      if (tag === 'textarea' || tag === 'title') {\n        return TextModes.RCDATA\n      }\n      if (isRawTextContainer(tag)) {\n        return TextModes.RAWTEXT\n      }\n    }\n    return TextModes.DATA\n}\n")])])]),t("p",[e._v("现在进行 parseChildren 的分析。首先获取父级 以及 父级的Namespaces，nodes 是解析后的 AST 节点。可以看到，一个 while 循环判断是否解析结束了，同时会 传入去 mode、ancestors，对于根节点来说，ancestors 一开始为空数组。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function parseChildren(\n  context: ParserContext,\n  mode: TextModes,\n  ancestors: ElementNode[]\n): TemplateChildNode[] {\n  const parent = last(ancestors)\n  const ns = parent ? parent.ns : Namespaces.HTML\n  const nodes: TemplateChildNode[] = []\n\n  while (!isEnd(context, mode, ancestors)) {\n    ...\n  }\n\n  // Whitespace management for more efficient output\n  // (same as v2 whitespace: 'condense')\n  let removedWhitespace = false\n  if (mode !== TextModes.RAWTEXT) {\n    ...\n  }\n\n  return removedWhitespace ? nodes.filter(Boolean) : nodes\n}\n")])])]),t("p",[e._v("isEnd 用于判断是否应该要结束解析，")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function isEnd(\n  context: ParserContext,\n  mode: TextModes,\n  ancestors: ElementNode[]\n): boolean {\n  const s = context.source\n\n  switch (mode) {\n    case TextModes.DATA:\n      if (startsWith(s, '</')) {\n        //TODO: probably bad performance\n        for (let i = ancestors.length - 1; i >= 0; --i) {\n          if (startsWithEndTagOpen(s, ancestors[i].tag)) {\n            return true\n          }\n        }\n      }\n      break\n\n    case TextModes.RCDATA:\n    case TextModes.RAWTEXT: {\n      const parent = last(ancestors)\n      if (parent && startsWithEndTagOpen(s, parent.tag)) {\n        return true\n      }\n      break\n    }\n\n    case TextModes.CDATA:\n      if (startsWith(s, ']]>')) {\n        return true\n      }\n      break\n  }\n\n  return !s\n}\n")])])])])}),[],!1,null,null,null);n.default=a.exports}}]);