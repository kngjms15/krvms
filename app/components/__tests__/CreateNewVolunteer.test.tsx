import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";

import CreateNewVolunteer from "../CreateNewVolunteer";

describe("CreateNewVolunteer component", () => {
  test("renders without error", () => {
    render(
      <CreateNewVolunteer
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  test("renders without error", () => {
    render(<CreateNewVolunteer onClose={() => {}} />);
    expect(screen.getByText("Create New Volunteer")).toBeInTheDocument();
  });

  test("can fill in form fields", () => {
    render(<CreateNewVolunteer onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:"), {
      target: { value: "Doe" },
    });
    // Add similar fireEvent.change calls for other fields
    expect(screen.getByLabelText("First Name:")).toHaveValue("John");
    expect(screen.getByLabelText("Last Name:")).toHaveValue("Doe");
    // Add similar expect calls for other fields
  });
 
});
