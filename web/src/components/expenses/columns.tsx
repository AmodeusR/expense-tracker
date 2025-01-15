import { Expense } from "@/lib/api.types";
import { ColumnDef } from "@tanstack/react-table";


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
  }
]