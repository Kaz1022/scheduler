import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Formã€€interviewersData={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Formã€€interviewersData={interviewers} student="Lydia Miller-Jones"/>);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    
    const { getByText } = render(<Formã€€interviewersData={interviewers} onSave={onSave}/>);
    /* 3. Click the save button */
    const button = getByText("Save")
    fireEvent.click(button);

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText } = render(<Form interviewersData={interviewers} onSave={onSave} student="Lydia Miller-Jones" interviewer={null}/>);

    /* 3. Click the save button */
    const button = getByText("Save")
    fireEvent.click(button);

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form 
        interviewersData={interviewers} 
        onSave={onSave}
        interviewer={interviewers[0].id}
      />);

    const button = getByText("Save");
    fireEvent.click(button);

    expect(queryByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    const input = getByPlaceholderText("Enter Student Name");
    fireEvent.change(input, {target: { value: "Lydia Miller-Jones" } });

    fireEvent.click(button);

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);

  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewersData={interviewers}
        interviewer={interviewers[0].id}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
   
    const input = getByPlaceholderText("Enter Student Name");
    fireEvent.change(input, {
      target: { value: "Lydia Miller-Jones" }
    });
  
    const button = getByText("Cancel");
    fireEvent.click(button);
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});
