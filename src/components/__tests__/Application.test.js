import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});
