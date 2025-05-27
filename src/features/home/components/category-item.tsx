import { imageMap } from "@/lib";
import { Link } from "react-router";

const CategoryItem = ({ id, title }: { id: number; title: string }) => {
  return (
    <Link
      to={`/quiz-start?category=${id}`}
      className="flex flex-col gap-2 items-center justify-center p-4 h-32 cursor-pointer hover:bg-secondary/5 transition-all duration-250 rounded-lg"
    >
      <img src={imageMap[id]} alt="catergory-icon" className="h-16" />
      <h1 className="text-center text-sm font-bold">{title}</h1>
    </Link>
  );
};

export default CategoryItem;
