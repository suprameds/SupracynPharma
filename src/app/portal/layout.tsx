import { type ReactNode } from "react";

/**
 * Minimal portal shell — intentionally no public nav, no footer.
 * Login and auth-callback pages use this bare layout.
 * Protected admin pages get the sidebar via portal/(admin)/layout.tsx.
 */
export default function PortalRootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
