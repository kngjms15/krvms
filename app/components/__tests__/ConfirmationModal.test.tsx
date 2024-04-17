import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";

import ConfirmationModal from "../ConfirmationModal";

describe("ConfirmationModal component", () => {
  test("renders without error", () => {
    render(
      <ConfirmationModal
        message="Are you sure?"
        onConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
        onCancel={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  test("calls onConfirm when the confirm button is clicked", () => {
    const onConfirm = jest.fn();
    render(
      <ConfirmationModal
        message="Are you sure?"
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test("calls onCancel when the cancel button is clicked", () => {
    const onCancel = jest.fn();
    render(
      <ConfirmationModal
        message="Are you sure?"
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
