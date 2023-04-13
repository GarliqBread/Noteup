import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { wrapWithTheme } from "@/components/ThemeWrapper";
import { EditorBar } from "@noteup/shared/components/NoteEditor/EditorBar";

describe("<EditorBar />", () => {
  it("renders the EditorBar component", () => {
    const component = render(
      wrapWithTheme(
        <RecoilRoot>
          <EditorBar downloadMarkdown={() => null} downloadPdf={() => null} />
        </RecoilRoot>,
      ),
    );
    expect(component).toBeTruthy();
    const themeButton = component.getByTitle("Change theme");
    expect(themeButton).toBeTruthy();
  });
});
