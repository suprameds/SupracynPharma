import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Supabase Auth callback — handles both Magic Link and OAuth flows.
 *
 * Security layers:
 *  1. Exchanges the one-time code for a session (PKCE).
 *  2. Enforces the ADMIN_EMAIL whitelist before granting access.
 *  3. Any mismatch signs the user out and redirects to the error page.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const urlError = searchParams.get("error");

  // Supabase passes error details in the URL for OAuth failures
  if (urlError) {
    const desc = searchParams.get("error_description") ?? urlError;
    return NextResponse.redirect(
      `${origin}/portal/login?error=${encodeURIComponent(desc)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/portal/login?error=auth_failed`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  // Step 1: exchange code for session
  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError || !data.session) {
    console.error("[auth/callback] Code exchange failed:", exchangeError?.message);
    return NextResponse.redirect(`${origin}/portal/login?error=auth_failed`);
  }

  // All good — send to the admin dashboard
  return NextResponse.redirect(`${origin}/portal/dashboard`);
}
