import { createFileRoute, Outlet } from "@tanstack/react-router";

function WritingLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/writing")({
  component: WritingLayout,
});