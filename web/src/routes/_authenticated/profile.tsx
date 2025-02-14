import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/lib/api";
import { userQueryOptions } from "@/lib/api.queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { data, isLoading, error } = useQuery(userQueryOptions);
  const userPicture = data?.user.picture === null ? undefined : data?.user.picture;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={userPicture} alt="User's profile picture" />
        <AvatarFallback className="text-sm font-semibold">User</AvatarFallback>
      </Avatar>

      <h2 className="text-2xl font-semibold">Profile</h2>
      <p>Welcome, {data?.user.given_name}</p>
      <a
        href={api.logout.$url().href}
        className="font-semibold text-blue-500 hover:text-blue-300 transition-colors"
      >
        Logout
      </a>
    </div>
  );
}

export default Profile;
