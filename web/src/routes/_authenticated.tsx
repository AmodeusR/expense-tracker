import { loginPath } from "@/lib/api";
import { userQueryOptions } from "@/lib/api.queries";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (error) {
      console.error(error);
      return { user: null };
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <Login />;
  }

  return <Outlet />;
}

function Login() {
  return (
    <div className="mx-auto text-center">
      <p>You're not logged in!</p>
      <a href={loginPath} className="font-semibold text-blue-500 hover:text-blue-300 transition-colors">
        Log in now
      </a>
    </div>
  );
}
