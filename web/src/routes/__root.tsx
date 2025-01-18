import { cn } from "@/lib/utils";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    const linkStyles = cn("[&.active]:bg-zinc-800 font-medium px-6 py-2 hover:bg-zinc-900 transition-colors");

    return (
    <>
      <nav className="flex items-center mx-10">
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
      <hr className="border-zinc-800" />
      <Outlet />
    </>
  )},
});
