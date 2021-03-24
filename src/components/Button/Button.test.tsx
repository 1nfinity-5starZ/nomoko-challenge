import React from "react";
import Button from "./";
import { render } from "@testing-library/react";

test("Displays the correct title", () => {
  const { getByText } = render(<Button>Hello</Button>);
  expect(getByText("Hello")).toBeInTheDocument();
});
