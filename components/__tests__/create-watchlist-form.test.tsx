import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CreateWatchlistForm } from "../create-watchlist-form";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock the create action
jest.mock("../../lib/actions/watchlist-actions", () => ({
  createWatchlist: jest.fn(),
}));

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("CreateWatchlistForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<CreateWatchlistForm />);

    expect(screen.getByLabelText("Nombre de la lista")).toBeInTheDocument();
    expect(screen.getByText("Crear Lista")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const user = userEvent.setup();
    render(<CreateWatchlistForm />);

    const submitButton = screen.getByText("Crear Lista");
    await user.click(submitButton);

    expect(screen.getByText("El nombre es requerido")).toBeInTheDocument();
  });
});
