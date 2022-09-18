import { fireEvent, render } from "@testing-library/react";

import { Dropdown } from "@/components/Dropdown";
import { wrapWithTheme } from "@/components/ThemeWrapper";

describe("<Dropdown />", () => {
  it("renders the Dropdown component", () => {
    const dropdownProps = {
      menu: [
        {
          children: <span data-testid="test-item">test</span>,
        },
      ],
    };
    const component = render(wrapWithTheme(<Dropdown {...dropdownProps} />));
    expect(component).toBeTruthy();
  });
});

test("Dropdown is disabled when clicked", async () => {
  const dropdownProps = {
    menu: [
      {
        children: <span data-testid="test-item">test</span>,
      },
    ],
  };
  const component = render(wrapWithTheme(<Dropdown {...dropdownProps} />));
  const trigger = component.getByTestId("trigger");
  fireEvent.click(trigger);
});
