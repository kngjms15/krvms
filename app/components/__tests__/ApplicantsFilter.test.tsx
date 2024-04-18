import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";

import ApplicantsFilter from "../ApplicantsFilter";
import FilterComponent from "../ApplicantsFilter";

describe("ApplicantsFilter component", () => {
  test("renders without error", () => {
    render(
      <ApplicantsFilter
        onSort={function (sortBy: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  test("renders the sort component", () => {
    render(
      <ApplicantsFilter
        onSort={function (sortBy: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(screen.getByText("Sort By:")).toBeInTheDocument();
  });

  test("calls onSort function with correct argument when select value changes", () => {
    const onSortMock = jest.fn();
    render(<FilterComponent onSort={onSortMock} />);
    const selectElement = screen.getByRole("combobox", { name: "Sort By:" });
    fireEvent.change(selectElement, { target: { value: "name" } });
    expect(onSortMock).toHaveBeenCalledWith("name");
  });

  test("calls onSort function with correct argument when select value changes", () => {
    const onSortMock = jest.fn();
    render(<FilterComponent onSort={onSortMock} />);
    const selectElement = screen.getByRole("combobox", { name: "Sort By:" });
    fireEvent.change(selectElement, { target: { value: "name" } });
    expect(onSortMock).toHaveBeenCalledWith("name");
  });
  
  test("displays correct options in select element", () => {
    render(<FilterComponent onSort={() => {}} />);
    const selectElement = screen.getByRole("combobox", { name: "Sort By:" });
    expect(selectElement).toHaveTextContent("Select...");
    expect(selectElement).toHaveTextContent("Name");
    expect(selectElement).toHaveTextContent("Application Date");
    expect(selectElement).toHaveTextContent("Chapter");
  });
  
});
