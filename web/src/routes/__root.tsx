import { cn } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";

interface RootRouterWithContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouterWithContext>()({
  component: () => {
    const linkStyles = cn("[&.active]:bg-zinc-800 font-medium px-6 py-2 hover:bg-zinc-900 transition-colors");

    return (
    <>
      <nav className="flex items-center px-10 mb-10 border-b-[1px] border-zinc-800">
        <Link to="/" className={linkStyles}>
          Home
        </Link>{" "}
        <Link to="/about" className={linkStyles}>
          About
        </Link>
        <Link to="/expenses" className={linkStyles}>
          Expenses
        </Link>
        <Link to="/create-expense" className={linkStyles}>
          Create Expense
        </Link>
        <Link to="/profile" className={linkStyles}>
          Profile
        </Link>
      </nav>
      <Outlet />
    </>
  )},
});
