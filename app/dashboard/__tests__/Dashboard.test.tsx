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
});
