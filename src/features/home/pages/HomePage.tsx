import CategoryItem from "@/features/home/components/category-item";

function HomePage() {
  return (
    <div className="flex-1 flex-col">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="grid grid-cols-6 gap-4 mt-6">
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
        <CategoryItem id={1} title="General Knowledge" />
      </div>
    </div>
  );
}

export default HomePage;
