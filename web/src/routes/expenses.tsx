import { columns } from "@/components/expenses/columns";
import DataTable from "@/components/expenses/datatable";
import SkeletonExpenses from "@/components/expenses/skeleton";
import { getAllExpenses } from "@/services/expenses";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

function Expenses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (isLoading) {
    return (
      <div className="mt-10">
        <SkeletonExpenses />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 gap-4">
      <h2 className="text-2xl font-semibold">All Expenses</h2>
      {error || data === undefined ? (
        <p>Something went wrong...</p>
      ) : (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
}
