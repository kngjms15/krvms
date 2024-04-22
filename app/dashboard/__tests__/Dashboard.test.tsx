import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";

import Dashboard from "../page"; // Imports the Dashboard component.

describe("Dashboard component", () => { // Describes the Dashboard component tests.

  // **Test Cases**

  // Test Case 1: Renders the Volunteers tab by default.
  test("renders the Volunteers tab by default", async () => {
    render(<Dashboard />); // Renders the Dashboard component.
    const volunteersTabs = screen.getAllByText("Volunteers"); // Finds all the tabs with "Volunteers" text.
    expect(volunteersTabs).toHaveLength(2); // Asserts that there are exactly two such elements
    expect(volunteersTabs[0]).toBeInTheDocument(); // Asserts that the first tab is present in the document. 
  });

  // Test Case 2: Switches tabs when a different tab is clicked.
  test("switches tabs when a different tab is clicked", async () => {
    render(<Dashboard />);// Renders the Dashboard component.
    const applicantsTab = screen.getByText("Applicants"); // Finds the "Applicants" tab.
    expect(applicantsTab).toBeInTheDocument(); // Asserts that the first tab is present in the document. 
  
    fireEvent.click(applicantsTab); // Simulates a click event on the "Applicants" tab. 
  
    await waitFor(() => {
      const applicantsHeader = screen.getByText("Applicants", { selector: "h1" }); // Finds the "Applicants" header. Technically, there is no header. 
      expect(applicantsHeader).toBeInTheDocument();// Asserts that the "Applicants" header is present in the document.
    });
  });  

  // Test Case 3: simple test to check that the Dashboard renders without throwing any errors.
  test("renders without error", () => {
    render(<Dashboard />); // Renders the Dashboard component.

    const headerElement = screen.getByRole("heading", { name: /dashboard/i }) // Finds the header element with text "Dashboard".
    expect(headerElement).toBeInTheDocument(); // Asserts that the header element is present in the document.

  });

  test("switches tabs when a different tab is clicked", () => {
    render(<Dashboard />);
    const applicantsTab = screen.getByText("Applicants");
    fireEvent.click(applicantsTab);
    expect(applicantsTab).toHaveClass("bg-[#6CC24A]");
  });

  test("updates search query when typing in search input", () => {
    render(<Dashboard />);
    const searchInput = screen.getByPlaceholderText("name, email, or phone");
    fireEvent.change(searchInput, { target: { value: "John" } });
    expect(searchInput).toHaveValue("John");
  });
  
  test("updates sort option when selecting an option", () => {
    render(<Dashboard />);
    const sortSelect = screen.getByLabelText("Sort by:");
    fireEvent.change(sortSelect, { target: { value: "name" } });
    expect(sortSelect).toHaveValue("name");
  });
  
  test("renders the CreateNewVolunteer component when the create volunteer modal is open", () => {
    render(<Dashboard />);
    const addButton = screen.getByText("Add New Volunteer");
    fireEvent.click(addButton);
    expect(screen.getByText("Create New Volunteer")).toBeInTheDocument();
  });
  
});
