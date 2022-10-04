import { Command } from ".";

export const todo: Command = {
  label: "Add todo List",
  icon: (
    <svg viewBox="0 0 48 48" fill="none" height="15" width="15">
      <path
        d="m5 10 3 3 6-6M5 24l3 3 6-6M5 38l3 3 6-6m7-11h22M21 38h22M21 10h22"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  execute: (editor) => {
    if (!editor || !editor.view) return;
    const { view } = editor;

    const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
    let mark = "- [ ]  ";
    const matchMark = lineInfo.text.match(/^-\s\[\s\]\s/);

    if (matchMark && matchMark[0]) {
      mark = "";
    }

    view.dispatch({
      changes: {
        from: lineInfo.from,
        to: lineInfo.to,
        insert: `${mark}${lineInfo.text}`,
      },
      selection: { anchor: view.state.selection.main.from + mark.length },
    });
  },
};
