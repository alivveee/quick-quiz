import { categoryIconMap } from "@/lib";
import { Link } from "react-router";

const CategoryItem = ({ id, title }: { id: number; title: string }) => {
  const IconComponent = categoryIconMap[id as keyof typeof categoryIconMap];

  return (
    <Link
      to={`/quiz-start?category=${id}&title=${title}`}
      className="group flex flex-col gap-3 items-center justify-center p-4 sm:p-6 h-32 sm:h-36 bg-white border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 rounded-xl overflow-hidden"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-150 transition-all duration-300" />
        {IconComponent && (
          <IconComponent className="text-primary size-9 md:size-12 group-hover:scale-110 transition-all duration-300" />
        )}
      </div>
      <h1 className="text-center text-xs sm:text-sm font-semibold group-hover:text-primary transition-colors duration-300 leading-tight px-1">
        {title}
      </h1>
    </Link>
  );
};

export default CategoryItem;
