import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
  render(<Appointment />);
  });

  it("does something it is supposed to do", () => {

  });

  it("does something else it is supposedf to do", () => {

  });

});