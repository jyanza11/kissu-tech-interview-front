import { render, screen, waitFor } from "@testing-library/react";
import { HealthStatus } from "../health-status";

// Mock the actions
jest.mock("../../lib/actions", () => ({
  getHealthStatus: jest.fn(),
}));

describe("HealthStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<HealthStatus />);

    // Should show skeleton loading
    expect(screen.getByTestId("health-status-skeleton")).toBeInTheDocument();
  });

  it("renders healthy status correctly", async () => {
    const { getHealthStatus } = require("../../lib/actions");
    getHealthStatus.mockResolvedValue({
      success: true,
      data: {
        status: "ok",
        checks: {
          redis: "ok",
          db: "ok",
        },
      },
    });

    render(<HealthStatus />);

    await waitFor(() => {
      expect(screen.getByText("Backend:")).toBeInTheDocument();
      expect(screen.getByText("DB:")).toBeInTheDocument();
      expect(screen.getByText("Redis:")).toBeInTheDocument();
    });

    // Check for healthy status indicators
    const connectedBadges = screen.getAllByText("Conectado");
    expect(connectedBadges).toHaveLength(3);
  });

  it("renders unhealthy status correctly", async () => {
    const { getHealthStatus } = require("../../lib/actions");
    getHealthStatus.mockResolvedValue({
      success: true,
      data: {
        status: "error",
        checks: {
          redis: "error",
          db: "error",
        },
      },
    });

    render(<HealthStatus />);

    await waitFor(() => {
      expect(screen.getByText("Backend:")).toBeInTheDocument();
      expect(screen.getByText("DB:")).toBeInTheDocument();
      expect(screen.getByText("Redis:")).toBeInTheDocument();
    });

    // Check for unhealthy status indicators
    const errorBadges = screen.getAllByText("Error");
    expect(errorBadges).toHaveLength(3);
  });

  it("handles API error gracefully", async () => {
    const { getHealthStatus } = require("../../lib/actions");
    getHealthStatus.mockResolvedValue({
      success: false,
      error: "Network error",
    });

    render(<HealthStatus />);

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });
});
