/**
 * Unit tests for the /api/inquiry route handler.
 *
 * Strategy:
 *  - Mock @/lib/supabase-server so no real DB calls are made.
 *  - Mock next/server's NextRequest / NextResponse with lightweight fakes.
 *  - Each test imports the handler fresh (jest.resetModules) to reset the
 *    in-process rateStore between test groups.
 */

// ---------------------------------------------------------------------------
// Lightweight fakes for Next.js server primitives
// ---------------------------------------------------------------------------

class FakeNextRequest {
  private _body: unknown;
  readonly headers: Map<string, string>;

  constructor(body: unknown, headers: Record<string, string> = {}) {
    this._body = body;
    this.headers = new Map(Object.entries(headers));
  }

  async json() {
    if (typeof this._body === "string") throw new SyntaxError("Invalid JSON");
    return this._body;
  }
}

const NextResponseJson = jest.fn((body: unknown, init?: { status?: number }) => ({
  _body: body,
  _status: init?.status ?? 200,
}));

jest.mock("next/server", () => ({
  NextRequest: FakeNextRequest,
  NextResponse: { json: NextResponseJson },
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_PAYLOAD = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Pharma Co",
  email: "jane@pharma.com",
  phone: "+91 9000000000",
  message: "This message is long enough to pass validation.",
  type: "general" as const,
};

function makeRequest(body: unknown, ip = "1.2.3.4") {
  return new FakeNextRequest(body, { "x-forwarded-for": ip }) as unknown as import("next/server").NextRequest;
}

function mockSupabase(insertError: unknown = null) {
  jest.doMock("@/lib/supabase-server", () => ({
    supabaseServerClient: {
      from: () => ({
        insert: jest.fn().mockResolvedValue({ error: insertError }),
      }),
    },
  }));
}

async function getHandler() {
  const mod = await import("@/app/api/inquiry/route");
  return mod.POST;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("POST /api/inquiry", () => {
  beforeEach(() => {
    jest.resetModules();
    NextResponseJson.mockClear();
  });

  // ── Happy path ────────────────────────────────────────────────────────────

  it("returns 201 for a valid payload", async () => {
    mockSupabase();
    const POST = await getHandler();

    await POST(makeRequest(VALID_PAYLOAD));

    expect(NextResponseJson).toHaveBeenCalledWith(
      { ok: true },
      expect.objectContaining({ status: 201 }),
    );
  });

  // ── Input validation ──────────────────────────────────────────────────────

  it("returns 400 for an invalid JSON body", async () => {
    mockSupabase();
    const POST = await getHandler();

    // FakeNextRequest throws when body is a string
    await POST(makeRequest("bad-json"));

    expect(NextResponseJson).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/Invalid JSON/i) }),
      expect.objectContaining({ status: 400 }),
    );
  });

  it("returns 400 when required fields are missing", async () => {
    mockSupabase();
    const POST = await getHandler();

    await POST(makeRequest({ firstName: "Only" }));

    expect(NextResponseJson).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validation failed" }),
      expect.objectContaining({ status: 400 }),
    );
  });

  it("returns 400 for an invalid email", async () => {
    mockSupabase();
    const POST = await getHandler();

    await POST(makeRequest({ ...VALID_PAYLOAD, email: "not-an-email" }));

    expect(NextResponseJson).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validation failed" }),
      expect.objectContaining({ status: 400 }),
    );
  });

  it("returns 400 when message is under 10 characters", async () => {
    mockSupabase();
    const POST = await getHandler();

    await POST(makeRequest({ ...VALID_PAYLOAD, message: "Short" }));

    expect(NextResponseJson).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Validation failed" }),
      expect.objectContaining({ status: 400 }),
    );
  });

  // ── Infrastructure errors ─────────────────────────────────────────────────

  it("returns 503 when Supabase client is not configured", async () => {
    jest.doMock("@/lib/supabase-server", () => ({
      supabaseServerClient: null,
    }));
    const POST = await getHandler();

    await POST(makeRequest(VALID_PAYLOAD));

    expect(NextResponseJson).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/not configured/i) }),
      expect.objectContaining({ status: 503 }),
    );
  });

  it("returns 500 when Supabase insert fails", async () => {
    mockSupabase({ message: "unique constraint violation" });
    const POST = await getHandler();

    await POST(makeRequest(VALID_PAYLOAD));

    expect(NextResponseJson).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/Failed to submit/i) }),
      expect.objectContaining({ status: 500 }),
    );
  });

  // ── Rate limiting ─────────────────────────────────────────────────────────

  it("returns 429 after 3 requests from the same IP within the window", async () => {
    mockSupabase();
    const POST = await getHandler();
    const ip = "5.5.5.5";

    // First 3 should succeed (rate limit max = 3)
    for (let i = 0; i < 3; i++) {
      await POST(makeRequest(VALID_PAYLOAD, ip));
    }

    // 4th request from same IP should be rate-limited
    NextResponseJson.mockClear();
    await POST(makeRequest(VALID_PAYLOAD, ip));

    expect(NextResponseJson).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/Too many requests/i) }),
      expect.objectContaining({ status: 429 }),
    );
  });

  it("allows requests from different IPs independently", async () => {
    mockSupabase();
    const POST = await getHandler();

    // Exhaust rate limit for IP A
    for (let i = 0; i < 3; i++) {
      await POST(makeRequest(VALID_PAYLOAD, "10.0.0.1"));
    }

    // IP B should still succeed
    NextResponseJson.mockClear();
    await POST(makeRequest(VALID_PAYLOAD, "10.0.0.2"));

    expect(NextResponseJson).toHaveBeenCalledWith(
      { ok: true },
      expect.objectContaining({ status: 201 }),
    );
  });
});
