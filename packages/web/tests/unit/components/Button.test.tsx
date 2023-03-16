import { render } from "@testing-library/react";

import { Button } from "@/components/Button";
import { wrapWithTheme } from "@/components/ThemeWrapper";

describe("<Button />", () => {
  it("renders the Button component", () => {
    const buttonProps = {
      testId: "test-button",
      onClick: jest.fn(),
    };
    const component = render(wrapWithTheme(<Button {...buttonProps}>test</Button>));
    expect(component).toBeTruthy();
  });
});

test("Button is disabled", async () => {
  const buttonProps = {
    testId: "test-button",
    disabled: true,
    onClick: jest.fn(),
  };

  const component = render(wrapWithTheme(<Button {...buttonProps}>test</Button>));
  const button = component.getByTestId("test-button");
  expect(button).toBeDisabled();
});
