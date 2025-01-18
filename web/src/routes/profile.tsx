import { api } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/profile")({
  component: Profile
})

function Profile() {
  const userProfile = api
  return (
    <div className="flex flex-col items-center mt-10 gap-4">Profile</div>
  )
}

export default Profile