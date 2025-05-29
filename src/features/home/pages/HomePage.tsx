import CategoryItem from "@/features/home/components/CategoryItem";
import { useCategories } from "../hooks/useCategories";
function HomePage() {
  const { data: categories, loading } = useCategories();
  return (
    <div className="flex-1 flex-col px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mt-4 sm:mt-6">
        {loading &&
          Array.from({ length: 12 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        {categories &&
          categories.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              title={category.name}
            />
          ))}
      </div>
    </div>
  );
}

export default HomePage;

const CategorySkeleton = () => (
  <div className="group flex flex-col gap-3 items-center justify-center p-4 sm:p-6 h-32 sm:h-36 bg-white border border-border rounded-xl animate-pulse">
    <div className="w-9 sm:w-12 h-9 sm:h-12 bg-gray-200 rounded-full" />
    <div className="w-16 h-3 bg-gray-200 rounded" />
  </div>
);
