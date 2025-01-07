import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/expenses/total-spent");
      const data = await response.json();

      console.log(data);
      setTotalSpent(data.totalAmount);
    }

    fetchData();
  }, []);
  return (
    <div className="bg-background m-10 flex flex-col items-center">
      <Card className="w-[300px] p-2">
        <CardHeader>
          <CardTitle>Teste</CardTitle>
          <CardDescription>Total amount spent</CardDescription>
        </CardHeader>
        <CardContent>
          {totalSpent}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
