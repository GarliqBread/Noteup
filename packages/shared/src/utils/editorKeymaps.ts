import { EditorSelection, StateCommand, Transaction } from "@codemirror/state";

export const insertBoldMarker: StateCommand = ({ state, dispatch }) => {
  const changes = state.changeByRange((range) => {
    const isBoldBefore = state.sliceDoc(range.from - 2, range.from) === "**";
    const isBoldAfter = state.sliceDoc(range.to, range.to + 2) === "**";
    const newChanges = [
      isBoldBefore
        ? {
            from: range.from - 2,
            to: range.from,
            insert: "",
          }
        : {
            from: range.from,
            insert: "**",
          },
      isBoldAfter
        ? {
            from: range.to,
            to: range.to + 2,
            insert: "",
          }
        : {
            from: range.to,
            insert: "**",
          },
    ];

    const extendBefore = isBoldBefore ? -2 : 2;
    const extendAfter = isBoldAfter ? -2 : 2;
    return {
      changes: newChanges,
      range: EditorSelection.range(range.from + extendBefore, range.to + extendAfter),
    };
  });

  dispatch(
    state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input"),
    }),
  );

  return true;
};

export const insertItalicMarker: StateCommand = ({ state, dispatch }) => {
  const changes = state.changeByRange((range) => {
    const isItalicBefore = state.sliceDoc(range.from - 1, range.from) === "*";
    const isItalicAfter = state.sliceDoc(range.to, range.to + 1) === "*";
    const newChanges = [
      isItalicBefore
        ? {
            from: range.from - 1,
            to: range.from,
            insert: "",
          }
        : {
            from: range.from,
            insert: "*",
          },
      isItalicAfter
        ? {
            from: range.to,
            to: range.to + 1,
            insert: "",
          }
        : {
            from: range.to,
            insert: "*",
          },
    ];

    const extendBefore = isItalicBefore ? -1 : 1;
    const extendAfter = isItalicAfter ? -1 : 1;
    return {
      changes: newChanges,
      range: EditorSelection.range(range.from + extendBefore, range.to + extendAfter),
    };
  });

  dispatch(
    state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input"),
    }),
  );

  return true;
};

export const insertCodeMarker: StateCommand = ({ state, dispatch }) => {
  const changes = state.changeByRange((range) => {
    const isCodeBefore = state.sliceDoc(range.from - 1, range.from) === "`";
    const isCodeAfter = state.sliceDoc(range.to, range.to + 1) === "`";
    const newChanges = [
      isCodeBefore
        ? {
            from: range.from - 1,
            to: range.from,
            insert: "",
          }
        : {
            from: range.from,
            insert: "`",
          },
      isCodeAfter
        ? {
            from: range.to,
            to: range.to + 1,
            insert: "",
          }
        : {
            from: range.to,
            insert: "`",
          },
    ];

    const extendBefore = isCodeBefore ? -1 : 1;
    const extendAfter = isCodeAfter ? -1 : 1;
    return {
      changes: newChanges,
      range: EditorSelection.range(range.from + extendBefore, range.to + extendAfter),
    };
  });

  dispatch(
    state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input"),
    }),
  );

  return true;
};

export const insertLinkMarker: StateCommand = ({ state, dispatch }) => {
  const changes = state.changeByRange((range) => {
    const changes = [
      {
        from: range.from,
        insert: "[",
      },
      {
        from: range.to,
        insert: "]()",
      },
    ];

    return {
      changes,
      range: EditorSelection.range(range.from + 1, range.to + 1),
    };
  });

  dispatch(
    state.update(changes, {
      scrollIntoView: true,
      annotations: Transaction.userEvent.of("input"),
    }),
  );

  return true;
};

export const customKeymap = [
  {
    key: "Ctrl-b",
    mac: "cmd-b",
    run: insertBoldMarker,
  },
  {
    key: "Ctrl-i",
    mac: "cmd-shift-i",
    run: insertItalicMarker,
  },
  {
    key: "Ctrl-shift-c",
    mac: "cmd-shift-c",
    run: insertCodeMarker,
  },
  {
    key: "Ctrl-shift-x",
    mac: "cmd-shift-x",
    run: insertLinkMarker,
  },
];
