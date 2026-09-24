import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/condicoes")({
  beforeLoad: () => {
    throw redirect({ to: "/quem-controla", statusCode: 301 });
  },
});
