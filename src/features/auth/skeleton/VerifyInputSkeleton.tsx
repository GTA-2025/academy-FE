
const VerificationSkeleton = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center">
      <div className="max-w-md w-full rounded-lg p-6 space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto animate-pulse" />

        <div className="space-y-6">
          <div className="flex justify-between gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>

          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>

        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto animate-pulse" />
      </div>
    </div>
  );
};

export default VerificationSkeleton;
