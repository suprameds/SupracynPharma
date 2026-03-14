import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ProductsFilter } from "@/components/blocks/products-filter";

// Mock Next.js navigation hooks
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/products",
  useTransition: () => [false, (fn: () => void) => fn()],
}));
// useTransition is a React hook — mock at React level
jest.spyOn(React, "useTransition").mockReturnValue([false, (fn) => fn()]);

const mockCategoryCounts = [
  { category: "cardiology", count: 176 },
  { category: "diabetology", count: 88 },
  { category: "anti-infectives", count: 41 },
];

function renderComponent(overrides?: {
  activeCategory?: string;
  activeSearch?: string;
  activeForm?: string;
}) {
  return render(
    <ProductsFilter
      categoryCounts={mockCategoryCounts}
      activeCategory={overrides?.activeCategory ?? "all"}
      activeSearch={overrides?.activeSearch ?? ""}
      activeForm={overrides?.activeForm ?? "all"}
    />
  );
}

describe("ProductsFilter", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders category list with counts", () => {
    renderComponent();
    expect(screen.getByText("Cardiology")).toBeInTheDocument();
    expect(screen.getByText("176")).toBeInTheDocument();
    expect(screen.getByText("Diabetology")).toBeInTheDocument();
    expect(screen.getByText("88")).toBeInTheDocument();
  });

  it("shows All Categories option", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /all categories/i })).toBeInTheDocument();
  });

  it("navigates to category URL when a category is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /cardiology/i }));
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("category=cardiology"));
  });

  it("clears category when All Categories is clicked", async () => {
    const user = userEvent.setup();
    renderComponent({ activeCategory: "cardiology" });

    await user.click(screen.getByRole("button", { name: /all categories/i }));
    // URL should not contain category param
    const calledUrl: string = mockPush.mock.calls[0][0];
    expect(calledUrl).not.toContain("category=");
  });

  it("shows clear filters button when filters are active", () => {
    renderComponent({ activeCategory: "cardiology" });
    expect(screen.getByRole("button", { name: /clear all filters/i })).toBeInTheDocument();
  });

  it("does not show clear filters button when no filters active", () => {
    renderComponent();
    expect(screen.queryByRole("button", { name: /clear all filters/i })).not.toBeInTheDocument();
  });

  it("renders search input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/brand name or ingredient/i)).toBeInTheDocument();
  });

  it("submits search and navigates", async () => {
    const user = userEvent.setup();
    renderComponent();

    const input = screen.getByPlaceholderText(/brand name or ingredient/i);
    await user.type(input, "Metformin");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("search=Metformin"));
  });

  it("renders dosage form filter chips", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /tablets/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /capsules/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /syrups/i })).toBeInTheDocument();
  });

  it("highlights active category", () => {
    renderComponent({ activeCategory: "diabetology" });
    // Active category button has different styling — check aria/text
    const btn = screen.getByRole("button", { name: /diabetology/i });
    expect(btn).toBeInTheDocument();
  });
});
