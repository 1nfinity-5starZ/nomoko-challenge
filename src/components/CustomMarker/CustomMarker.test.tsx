import React from "react";
import CustomMarker from ".";
import { render, fireEvent } from "@testing-library/react";

const onClick = jest.fn();

test("CustomMarker", () => {
  const { getByTestId } = render(
    <CustomMarker index={0} anchor={[0, 0]} active={true} onClick={onClick} />
  );

  // Tests rendering
  const elem = getByTestId("customMarker");
  expect(elem).toBeInTheDocument();

  // Tests clicking
  fireEvent.click(elem);
  expect(onClick).toHaveBeenCalledTimes(1);
});
