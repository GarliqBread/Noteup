import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { EditorBar } from "@/components/NoteEditor/EditorBar";
import { wrapWithTheme } from "@/components/ThemeWrapper";

describe("<EditorBar />", () => {
  it("renders the EditorBar component", () => {
    const component = render(
      wrapWithTheme(
        <RecoilRoot>
          <EditorBar />
        </RecoilRoot>,
      ),
    );
    expect(component).toBeTruthy();
    const themeButton = component.getByTitle("Change theme");
    expect(themeButton).toBeTruthy();
  });
});
