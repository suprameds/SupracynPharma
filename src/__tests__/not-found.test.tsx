/**
 * TDD: 404 Not Found page
 *
 * User journey:
 *   As a user who landed on a non-existent page, I want to see a clear error
 *   message and navigation options, so that I can get back to valid content.
 *
 *   As a user, I want the 404 page to match site branding (no full-page navy),
 *   so that it feels consistent with the rest of the site.
 */
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("NotFound (404) page", () => {
  it("renders 404 and Page Not Found heading", () => {
    const { container } = render(<NotFound />);
    expect(container).toHaveTextContent("404");
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
  });

  it("renders explanatory message", () => {
    render(<NotFound />);
    expect(
      screen.getByText(/the page you're looking for doesn't exist or has been moved/i)
    ).toBeInTheDocument();
  });

  it("renders Return Home link pointing to /", () => {
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: /return home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders Browse Products link pointing to /products", () => {
    render(<NotFound />);
    const productsLink = screen.getByRole("link", { name: /browse products/i });
    expect(productsLink).toHaveAttribute("href", "/products");
  });

  it("uses brand logo image instead of generic icon", () => {
    const { container } = render(<NotFound />);
    const logoImg = container.querySelector('img[src*="logo-icon"]');
    expect(logoImg).toBeInTheDocument();
  });

  it("does not use navy as full-page background (per brand preference)", () => {
    const { container } = render(<NotFound />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    // Navy was: style={{ backgroundColor: "oklch(0.35 0.12 255)" }}
    // We want a light/neutral background via Tailwind class instead
    expect(section).not.toHaveAttribute("style");
  });
});
