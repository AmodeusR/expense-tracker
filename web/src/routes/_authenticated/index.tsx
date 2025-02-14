import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { getTotalSpent } from '@/services/expenses'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

function Index() {
  const { isPending, data, error } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  })

  return (
    <div className="bg-background flex flex-col items-center">
      <Card className="w-[300px] p-2">
        <CardHeader>
          <CardTitle>Teste</CardTitle>
          <CardDescription>Total amount spent</CardDescription>
        </CardHeader>
        <CardContent>
          {error
            ? 'Something went wrong'
            : isPending
              ? '...'
              : data?.totalAmount.toFixed(2)}
        </CardContent>
      </Card>
    </div>
  )
}
