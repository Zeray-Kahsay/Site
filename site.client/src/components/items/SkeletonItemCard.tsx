const SkeletonItemCard = () => {
  return (
    <div className="bg-gray-100 animate-pulse rounded h-40 w-full">
      <div className="h-40 bg-gray-200 rounded-xl mb-4 dark:bg-gray-700" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 dark:bg-gray-700" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2 dark:bg-gray-700" />
      <div className="h-4 bg-gray-200 rounded w-1/3 dark:bg-gray-700" />
    </div>
  );
};

export default SkeletonItemCard;
