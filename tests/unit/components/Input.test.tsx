import { render } from "@testing-library/react";

import { wrapWithTheme } from "@/components/ThemeWrapper";
import { Input } from "@/components/Input";

describe("<Input />", () => {
  it("renders the Input component", () => {
    const inputProps = {
      testId: "test-input",
      onChange: jest.fn(),
      value: "",
    };
    const component = render(wrapWithTheme(<Input {...inputProps} />));
    expect(component).toBeTruthy();
  });
});

test("Input has correct value", async () => {
  const inputProps = {
    testId: "test-input",
    autoFocus: true,
    onChange: jest.fn(),
    value: "test",
  };

  const component = render(wrapWithTheme(<Input {...inputProps} />));
  const input = component.getByTestId("test-input");
  expect(input).toHaveValue("test");
});
