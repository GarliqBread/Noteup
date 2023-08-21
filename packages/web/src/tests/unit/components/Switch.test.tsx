import { Switch } from "@noteup/shared/components/Switch";
import { render } from "@testing-library/react";

import { wrapWithTheme } from "@/components/ThemeWrapper";

describe("<Switch />", () => {
  it("renders the Switch component", () => {
    const switchProps = {
      testId: "test-switch",
      toggle: jest.fn(),
      checked: false,
    };

    const component = render(wrapWithTheme(<Switch {...switchProps} />));
    expect(component).toBeTruthy();

    const checkbox = component.getByTestId("test-switch") as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
  });
});
