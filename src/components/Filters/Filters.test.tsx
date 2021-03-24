import React from "react";
import Filters from ".";
import { fireEvent, render } from "@testing-library/react";
import LangProvider from "../../providers/LangProvider";
import { act } from "react-test-renderer";

test("CustomMarker", () => {
  const { getByTestId } = render(
    <LangProvider>
      <Filters />
    </LangProvider>
  );

  // Tests rendering
  const form = getByTestId("type");
  expect(form).toBeInTheDocument();

  act(() => {
    fireEvent.submit(form, { target: { value: "Industrial" } });
  });
  // // Tests clicking
  // fireEvent.click(elem);
});
