import { api } from "@/lib/api";
import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/profile")({
  component: Profile
})

function Profile() {
  const { data, isLoading, error} = useQuery({ queryKey: ["get-user"], queryFn: getCurrentUser})

  return (
    <div className="flex flex-col items-center mt-10 gap-4">Profile</div>
  )
}

export default Profile