import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";

import AlertModal from "../AlertModal";

describe("AlertModal component", () => {
  test("renders without error", () => {
    render(<AlertModal title="Title" body="Body" onClick={() => {}} />);
  });

  test("renders the title and body", () => {
    render(<AlertModal title="Title" body="Body" onClick={() => {}} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  test("calls the onClick function when the confirm button is clicked", () => {
    const onClick = jest.fn();
    render(<AlertModal title="Title" body="Body" onClick={onClick} />);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onClick).toHaveBeenCalled();
  });
});
