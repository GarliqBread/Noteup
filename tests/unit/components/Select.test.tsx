import { fireEvent, render } from "@testing-library/react";

import { wrapWithTheme } from "@/components/ThemeWrapper";
import { Select } from "@/components/Select";

describe("<Select />", () => {
  it("renders the Select component", () => {
    const selectProps = {
      options: [
        {
          value: "test",
          label: "test",
        },
      ],
      value: "",
      onChange: jest.fn(),
    };
    const component = render(wrapWithTheme(<Select {...selectProps} />));
    expect(component).toBeTruthy();
  });
});

test("Select opens when clicked", async () => {
  const selectProps = {
    options: [
      {
        value: "test-value",
        label: "test-label",
      },
    ],
    value: "",
    onChange: jest.fn(),
  };

  const component = render(wrapWithTheme(<Select {...selectProps} />));
  const dropdown = component.getByTestId("test-select");
  fireEvent.click(dropdown);

  const visibleItem = component.getAllByTestId("test-value");
  expect(visibleItem).toBeTruthy();
});
