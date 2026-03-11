import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InquiryForm } from "@/components/blocks/inquiry-form";

describe("InquiryForm", () => {
  it("submits the form and shows success when API returns ok", async () => {
    const fetchSpy = vi.spyOn(global, "fetch" as any).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    render(<InquiryForm />);

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(
      screen.getByLabelText(/Company \/ Institution Name/i),
      {
        target: { value: "Acme Corp" },
      },
    );
    fireEvent.change(screen.getByLabelText(/Business Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "+1 555 000 0000" },
    });
    fireEvent.change(screen.getByLabelText(/Message \/ Details/i), {
      target: { value: "This is a test inquiry message." },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Submit Inquiry/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Inquiry Submitted/i),
      ).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/inquiry",
      expect.objectContaining({ method: "POST" }),
    );

    fetchSpy.mockRestore();
  });
}

