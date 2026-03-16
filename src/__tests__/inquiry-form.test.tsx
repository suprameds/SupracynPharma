import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InquiryForm } from "@/components/blocks/inquiry-form";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Fill out every required field with valid values. */
function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText(/Last Name/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText(/Company \/ Institution Name/i), {
    target: { value: "Acme Pharma Ltd" },
  });
  fireEvent.change(screen.getByLabelText(/Business Email/i), {
    target: { value: "john@acmepharma.com" },
  });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), {
    target: { value: "+91 70324 27651" },
  });
  fireEvent.change(screen.getByLabelText(/Message \/ Details/i), {
    target: { value: "This is a test inquiry message long enough." },
  });
}

function mockFetch(ok: boolean, body: object, status = ok ? 201 : 400) {
  return jest.spyOn(global, "fetch").mockResolvedValue({
    ok,
    status,
    json: async () => body,
  } as Response);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("InquiryForm", () => {
  afterEach(() => jest.restoreAllMocks());

  // ── Happy path ──────────────────────────────────────────────────────────

  it("renders all required fields", () => {
    render(<InquiryForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company \/ Institution Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message \/ Details/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
  });

  it("submits the form and shows success state on 201", async () => {
    const fetchSpy = mockFetch(true, { ok: true });

    render(<InquiryForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/Inquiry submitted/i)).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/inquiry",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
      }),
    );
  });

  it("sends the correct JSON payload including type=general", async () => {
    const fetchSpy = mockFetch(true, { ok: true });

    render(<InquiryForm type="general" />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());

    const body = JSON.parse(fetchSpy.mock.calls[0][1]!.body as string);
    expect(body).toMatchObject({
      firstName: "John",
      lastName: "Doe",
      company: "Acme Pharma Ltd",
      email: "john@acmepharma.com",
      phone: "+91 70324 27651",
      type: "general",
    });
  });

  it("resets the form after successful submission", async () => {
    mockFetch(true, { ok: true });

    render(<InquiryForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    // Success view should show "Submit Another Inquiry" button
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Submit Another Inquiry/i }),
      ).toBeInTheDocument(),
    );

    // Clicking it returns to the blank form
    fireEvent.click(screen.getByRole("button", { name: /Submit Another Inquiry/i }));
    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
  });

  // ── Error handling ───────────────────────────────────────────────────────

  it("shows server error message when API returns non-ok", async () => {
    mockFetch(false, { error: "Quota exceeded for today" }, 429);

    render(<InquiryForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    // The server error is rendered in a visible alert div (field errors are sr-only)
    await waitFor(() => {
      expect(screen.getByText(/Quota exceeded for today/i)).toBeInTheDocument();
    });
  });

  it("shows a generic network error when fetch throws", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("Network offline"));

    render(<InquiryForm />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  // ── Client-side validation ───────────────────────────────────────────────

  it("shows validation error when first name is empty on submit", async () => {
    render(<InquiryForm />);
    // Only fill the other fields, leave firstName blank
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/Company \/ Institution Name/i), { target: { value: "Acme" } });
    fireEvent.change(screen.getByLabelText(/Business Email/i), { target: { value: "x@y.com" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "+911234567890" } });
    fireEvent.change(screen.getByLabelText(/Message \/ Details/i), { target: { value: "Enough message here." } });

    fireEvent.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email format", async () => {
    render(<InquiryForm />);
    fireEvent.change(screen.getByLabelText(/Business Email/i), {
      target: { value: "not-an-email" },
    });
    // Trigger onTouched validation by blurring
    fireEvent.blur(screen.getByLabelText(/Business Email/i));

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it("shows validation error when message is too short", async () => {
    render(<InquiryForm />);
    fireEvent.change(screen.getByLabelText(/Message \/ Details/i), {
      target: { value: "Short" },
    });
    fireEvent.blur(screen.getByLabelText(/Message \/ Details/i));

    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  // ── Conditional fields ───────────────────────────────────────────────────

  it("shows Partnership Interest field when type=partnership", () => {
    render(<InquiryForm type="partnership" />);
    expect(screen.getByLabelText(/Partnership Interest/i)).toBeInTheDocument();
  });

  it("does not show Partnership Interest field when type=general", () => {
    render(<InquiryForm type="general" />);
    expect(screen.queryByLabelText(/Partnership Interest/i)).not.toBeInTheDocument();
  });

  it("shows Product of Interest field when type=product", () => {
    render(<InquiryForm type="product" prefillProduct="Amoxicillin 500mg" />);
    const field = screen.getByLabelText(/Product of Interest/i) as HTMLInputElement;
    expect(field).toBeInTheDocument();
    expect(field.value).toBe("Amoxicillin 500mg");
  });
});
