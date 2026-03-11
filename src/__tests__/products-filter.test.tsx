import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ProductsFilter } from "@/components/blocks/products-filter";

// Required mocks for Next.js components used by ProductCard
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src as string} alt={alt as string} />,
}));

type MockProduct = {
  id: string;
  name: string;
  genericName: string;
  therapyAreaId: string;
  dosageForm: string;
  strength: string;
  packSize: string;
  summary: string;
  highlights: string[];
  packagingStorage: string;
  isAvailableOnline: boolean;
  imageUrl: string;
};

type MockTherapyArea = {
  id: string;
  name: string;
  description: string;
  iconName: string;
  imageUrl: string;
};

const therapyAreas: MockTherapyArea[] = [
  { id: "ta-cardio", name: "Cardiology", description: "Heart", iconName: "heart", imageUrl: "/ta/cardio.jpg" },
  { id: "ta-derm", name: "Dermatology", description: "Skin", iconName: "skin", imageUrl: "/ta/derm.jpg" },
];

const products: MockProduct[] = [
  {
    id: "p-aspirin",
    name: "Aspirin",
    genericName: "Acetylsalicylic Acid",
    therapyAreaId: "ta-cardio",
    dosageForm: "Tablet",
    strength: "100 mg",
    packSize: "10",
    summary: "Pain relief",
    highlights: ["Analgesic"],
    packagingStorage: "Room temperature",
    isAvailableOnline: true,
    imageUrl: "/img/aspirin.png",
  },
  {
    id: "p-zincovit",
    name: "Zincovit",
    genericName: "Zinc + Vitamins",
    therapyAreaId: "ta-cardio",
    dosageForm: "Syrup",
    strength: "5 mg/5ml",
    packSize: "150 ml",
    summary: "Supplement",
    highlights: ["Immunity"],
    packagingStorage: "Cool place",
    isAvailableOnline: false,
    imageUrl: "/img/zincovit.png",
  },
  {
    id: "p-betacream",
    name: "Beta Cream",
    genericName: "Betamethasone",
    therapyAreaId: "ta-derm",
    dosageForm: "Cream",
    strength: "0.1%",
    packSize: "30 g",
    summary: "Topical steroid",
    highlights: ["Anti-inflammatory"],
    packagingStorage: "Away from sunlight",
    isAvailableOnline: true,
    imageUrl: "/img/beta-cream.png",
  },
];

function renderComponent() {
  return render(<ProductsFilter products={products} therapyAreas={therapyAreas} />);
}

function getProductLinkByName(name: string) {
  return screen.queryByRole("link", { name: new RegExp(name, "i") });
}

function expectInOrder(a: HTMLElement, b: HTMLElement) {
  // a should appear before b in DOM order
  const relation = a.compareDocumentPosition(b);
  expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
}

describe("ProductsFilter", () => {
  it("renders all products by default", () => {
    renderComponent();
    expect(screen.getByText(/Showing 3 of 3 products/i)).toBeInTheDocument();
    expect(getProductLinkByName("Aspirin")).toBeInTheDocument();
    expect(getProductLinkByName("Zincovit")).toBeInTheDocument();
    expect(getProductLinkByName("Beta Cream")).toBeInTheDocument();
  });

  it("filters by therapy area", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /Cardiology/i }));

    expect(screen.getByText(/Showing 2 of 3 products/i)).toBeInTheDocument();
    expect(getProductLinkByName("Aspirin")).toBeInTheDocument();
    expect(getProductLinkByName("Zincovit")).toBeInTheDocument();
    expect(getProductLinkByName("Beta Cream")).not.toBeInTheDocument();
  });

  it("filters by dosage form checkbox", async () => {
    const user = userEvent.setup();
    renderComponent();

    const tabletCheckbox = screen.getByRole("checkbox", { name: /Tablet/i });
    await user.click(tabletCheckbox);

    expect(screen.getByText(/Showing 1 of 3 products/i)).toBeInTheDocument();
    expect(getProductLinkByName("Aspirin")).toBeInTheDocument();
    expect(getProductLinkByName("Zincovit")).not.toBeInTheDocument();
    expect(getProductLinkByName("Beta Cream")).not.toBeInTheDocument();
  });

  it("combines therapy area and dosage form filters", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /Cardiology/i }));
    await user.click(screen.getByRole("checkbox", { name: /Syrup/i }));

    expect(screen.getByText(/Showing 1 of 3 products/i)).toBeInTheDocument();
    expect(getProductLinkByName("Zincovit")).toBeInTheDocument();
    expect(getProductLinkByName("Aspirin")).not.toBeInTheDocument();
    expect(getProductLinkByName("Beta Cream")).not.toBeInTheDocument();
  });

  it("shows empty state when no products match", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /Dermatology/i }));
    await user.click(screen.getByRole("checkbox", { name: /Tablet/i }));

    expect(screen.getByText(/No products match your filters/i)).toBeInTheDocument();
    // Clear button present in empty state
    expect(screen.getByRole("button", { name: /clear (all )?filters/i })).toBeInTheDocument();
  });

  it("clears filters to show all products", async () => {
    const user = userEvent.setup();
    renderComponent();

    // Create empty state first
    await user.click(screen.getByRole("button", { name: /Dermatology/i }));
    await user.click(screen.getByRole("checkbox", { name: /Tablet/i }));
    expect(screen.getByText(/No products match your filters/i)).toBeInTheDocument();

    // Click clear filters (supports both "Clear filters" and "Clear all filters")
    await user.click(screen.getByRole("button", { name: /clear (all )?filters/i }));

    expect(screen.getByText(/Showing 3 of 3 products/i)).toBeInTheDocument();
    expect(getProductLinkByName("Aspirin")).toBeInTheDocument();
    expect(getProductLinkByName("Zincovit")).toBeInTheDocument();
    expect(getProductLinkByName("Beta Cream")).toBeInTheDocument();
  });

  it("sorts A–Z by default", () => {
    renderComponent();

    const aspirin = getProductLinkByName("Aspirin");
    const beta = getProductLinkByName("Beta Cream");
    const zincovit = getProductLinkByName("Zincovit");

    expect(aspirin).toBeInTheDocument();
    expect(beta).toBeInTheDocument();
    expect(zincovit).toBeInTheDocument();

    // Assert DOM order: Aspirin < Beta Cream < Zincovit
    expectInOrder(aspirin as HTMLElement, beta as HTMLElement);
    expectInOrder(beta as HTMLElement, zincovit as HTMLElement);
  });

  it("sorts by therapy area when selected", async () => {
    const user = userEvent.setup();
    renderComponent();

    // Change sort dropdown to "Therapy Area"
    const sortSelect = screen.getByRole("combobox");
    await user.selectOptions(sortSelect, "Therapy Area");

    const aspirin = getProductLinkByName("Aspirin") as HTMLElement;
    const zincovit = getProductLinkByName("Zincovit") as HTMLElement;
    const beta = getProductLinkByName("Beta Cream") as HTMLElement;

    // Cardiology group should precede Dermatology group
    expectInOrder(aspirin, beta);
    expectInOrder(zincovit, beta);
  });
});

