import { Expense } from "@/lib/api.types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteExpense } from "@/services/expenses";
import { queryClient } from "@/lib/queryClient";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "id",
    header: "id"
  },
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);

      return <span className="font-medium">{formatted}</span>
    }
  },
  {
    id: "Delete",
    enableHiding: false,
    cell: ({ row }) => {
      const expense = row.original;

      const onDelete = async () => {
        await deleteExpense(expense.id);
        await queryClient.invalidateQueries({queryKey: ["get-all-expenses"]});
      }
            
      return (
        <Button variant="outline" onClick={onDelete}><Trash /></Button>
      )
  }}
]