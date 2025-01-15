import { Skeleton } from "../ui/skeleton";

const SkeletonExpenses = () => {
  return (
    <div className="space-y-1 m-auto">
      <Skeleton className="max-w-3xl h-[53px] m-auto" />
      <Skeleton className="max-w-3xl h-[53px] m-auto" />
      <Skeleton className="max-w-3xl h-[53px] m-auto" />
      <Skeleton className="max-w-3xl h-[53px] m-auto" />
      <Skeleton className="max-w-3xl h-[53px] m-auto" />
    </div>
  );
};

export default SkeletonExpenses;
