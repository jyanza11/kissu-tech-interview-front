import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WatchlistCard } from "../watchlist-card";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock the delete action
jest.mock("../../lib/actions/watchlist-actions", () => ({
  deleteWatchlist: jest.fn(),
}));

// Mock toast
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("WatchlistCard", () => {
  const mockWatchlist = {
    id: "1",
    name: "Test Watchlist",
    description: "Test Description",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    terms: [
      {
        id: "1",
        term: "test-term-1",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        term: "test-term-2",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders watchlist information correctly", () => {
    render(<WatchlistCard watchlist={mockWatchlist} />);

    expect(screen.getByText("Test Watchlist")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("2 términos")).toBeInTheDocument();
  });

  it("shows active status correctly", () => {
    render(<WatchlistCard watchlist={mockWatchlist} />);

    const statusBadge = screen.getByText("Activa");
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("bg-green-100", "text-green-800");
  });

  it("shows inactive status correctly", () => {
    const inactiveWatchlist = { ...mockWatchlist, isActive: false };
    render(<WatchlistCard watchlist={inactiveWatchlist} />);

    const statusBadge = screen.getByText("Inactiva");
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("bg-gray-100", "text-gray-800");
  });

  it("displays correct term count", () => {
    const watchlistWithOneTerm = {
      ...mockWatchlist,
      terms: [mockWatchlist.terms[0]],
    };

    render(<WatchlistCard watchlist={watchlistWithOneTerm} />);
    expect(screen.getByText("1 término")).toBeInTheDocument();

    const watchlistWithNoTerms = {
      ...mockWatchlist,
      terms: [],
    };

    render(<WatchlistCard watchlist={watchlistWithNoTerms} />);
    expect(screen.getByText("0 términos")).toBeInTheDocument();
  });

  it("formats dates correctly", () => {
    render(<WatchlistCard watchlist={mockWatchlist} />);

    // Check if the formatted date is displayed (Spanish format)
    expect(screen.getByText(/1\/1\/2024/)).toBeInTheDocument();
  });
});
