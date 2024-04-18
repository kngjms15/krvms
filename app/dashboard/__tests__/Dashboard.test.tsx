import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";

import Dashboard from "../page";

describe("Dashboard component", () => {
  test("renders the Volunteers tab by default", async () => {
    render(<Dashboard />);
    const volunteersTabs = screen.getAllByText("Volunteers");
    expect(volunteersTabs).toHaveLength(2); // Assuming there are two tabs with "Volunteers" text
    expect(volunteersTabs[0]).toBeInTheDocument();
  });

  test("switches tabs when a different tab is clicked", async () => {
    render(<Dashboard />);
    const applicantsTab = screen.getByText("Applicants");
    expect(applicantsTab).toBeInTheDocument();
  
    fireEvent.click(applicantsTab);
  
    await waitFor(() => {
      const applicantsHeader = screen.getByText("Applicants", { selector: "h1" });
      expect(applicantsHeader).toBeInTheDocument();
    });
  });  

  test("renders without error", () => {
    render(<Dashboard />);
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
