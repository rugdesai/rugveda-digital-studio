import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CursorGlow } from "../components/site/CursorGlow";
import { BackgroundFX } from "../components/site/BackgroundFX";
import { Dock } from "../components/site/Dock";
import { LetsTalkProvider } from "../components/site/LetsTalkModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for drifted off the map.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-ivory/10"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went sideways. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-ivory px-4 py-2 text-sm font-medium text-[#0b0b0f] hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="glass inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium hover:bg-ivory/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rugveda Desai — Software Engineer & AI Product Builder" },
      {
        name: "description",
        content:
          "Software engineer building thoughtful products with code, data and AI.",
      },
      { name: "author", content: "Rugveda Desai" },
      { property: "og:title", content: "Rugveda Desai — Software Engineer & AI Product Builder" },
      {
        property: "og:description",
        content: "Software engineer building thoughtful products with code, data and AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Rugveda Desai" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rugveda Desai — Software Engineer & AI Product Builder" },
      { name: "twitter:description", content: "Software engineer building thoughtful products with code, data and AI." },
    ],
    links: [
  {
    rel: "icon",
    href:
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22/>",
  },

  { rel: "stylesheet", href: appCss },

  { rel: "preconnect", href: "https://fonts.googleapis.com" },

  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },

  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
  },
],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LetsTalkProvider>
        <BackgroundFX />
        <CursorGlow />
        <div className="relative z-10 min-h-screen">
          <Outlet />
        </div>
        <Dock />
      </LetsTalkProvider>
    </QueryClientProvider>
  );
}
