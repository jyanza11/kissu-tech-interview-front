import { render, screen } from "@testing-library/react";
import WatchlistsPage from "../page";

// Mock the server actions
jest.mock("../../../lib/actions/watchlist-actions", () => ({
  getWatchlists: jest.fn(),
}));

// Mock the components
jest.mock("../../../components/create-watchlist-form", () => ({
  CreateWatchlistForm: () => <div data-testid="create-form">Create Form</div>,
}));

jest.mock("../../../components/watchlist-card", () => ({
  WatchlistCard: ({ watchlist }: { watchlist: any }) => (
    <div data-testid="watchlist-card">{watchlist.name}</div>
  ),
}));

describe("WatchlistsPage", () => {
  const mockWatchlists = [
    {
      id: "1",
      name: "Test Watchlist 1",
      description: "Test Description 1",
      isActive: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
      terms: [],
    },
    {
      id: "2",
      name: "Test Watchlist 2",
      description: "Test Description 2",
      isActive: false,
      createdAt: new Date("2024-01-02"),
      updatedAt: new Date("2024-01-02"),
      terms: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page title and description", async () => {
    const { getWatchlists } = require("../../../lib/actions/watchlist-actions");
    getWatchlists.mockResolvedValue({
      success: true,
      data: [],
    });

    render(await WatchlistsPage());

    expect(screen.getByText("Listas de Observación")).toBeInTheDocument();
    expect(
      screen.getByText("Gestiona las listas de términos que quieres monitorear")
    ).toBeInTheDocument();
  });

  it("renders watchlists when data is loaded", async () => {
    const { getWatchlists } = require("../../../lib/actions/watchlist-actions");
    getWatchlists.mockResolvedValue({
      success: true,
      data: mockWatchlists,
    });

    render(await WatchlistsPage());

    expect(screen.getByText("Test Watchlist 1")).toBeInTheDocument();
    expect(screen.getByText("Test Watchlist 2")).toBeInTheDocument();
  });

  it("shows empty state when no watchlists exist", async () => {
    const { getWatchlists } = require("../../../lib/actions/watchlist-actions");
    getWatchlists.mockResolvedValue({
      success: true,
      data: [],
    });

    render(await WatchlistsPage());

    expect(
      screen.getByText("No hay listas de observación")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Crea tu primera lista para comenzar a monitorear términos"
      )
    ).toBeInTheDocument();
  });

  it("shows error state when data loading fails", async () => {
    const { getWatchlists } = require("../../../lib/actions/watchlist-actions");
    getWatchlists.mockResolvedValue({
      success: false,
      error: "Error al cargar las listas",
    });

    render(await WatchlistsPage());

    expect(screen.getByText("Error al cargar las listas")).toBeInTheDocument();
  });

  it("renders create watchlist form", async () => {
    const { getWatchlists } = require("../../../lib/actions/watchlist-actions");
    getWatchlists.mockResolvedValue({
      success: true,
      data: [],
    });

    render(await WatchlistsPage());

    expect(screen.getByTestId("create-form")).toBeInTheDocument();
  });
});
