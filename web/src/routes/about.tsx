import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/about")({
  component: About
})

function About() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="max-w-md text-center">A simple fullstack project to practice the use of many technologies, among them are Drizzle, Kinde, Tanstack, Tailwind and much more.</p>
    </div>
  )
}