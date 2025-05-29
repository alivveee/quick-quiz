import type { QuizHistoryItem } from "@/hooks/useHistoryStorage";
import { categoryIconMap } from "@/lib";
import { FaCalendarAlt } from "react-icons/fa";

type Props = {
  item: QuizHistoryItem;
};

const HistoryCard = ({ item }: Props) => {
  const IconComponent =
    categoryIconMap[Number(item.category) as keyof typeof categoryIconMap];
  return (
    <div className="group rounded-xl border p-4 md:p-6 bg-white hover:border-primary hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 md:mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 md:size-12 bg-primary rounded-lg p-3.5">
            {IconComponent && (
              <IconComponent className="text-white size-4 md:size-5 group-hover:scale-110 transition-all duration-300" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base md:text-lg truncate">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
              <FaCalendarAlt
                size={10}
                className="md:w-3 md:h-3 flex-shrink-0"
              />
              <span className="truncate">{item.date}</span>
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right flex-shrink-0">
          <div className="text-xl md:text-2xl font-bold text-primary mb-1">
            {item.score}
          </div>
          <div className="text-xs text-muted-foreground">points</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs md:text-sm text-muted-foreground mb-3 gap-1">
        <span className="truncate">
          {item.type === "multiple"
            ? item.type
            : "Multiple Choice & True/False"}{" "}
          • {item.questions} questions
        </span>
        <span className="font-medium">{item.correct} correct</span>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 group-hover:from-primary group-hover:to-primary/60"
          style={{ width: `${item.accuracy}%` }}
        />
      </div>
      <div className="text-right mt-1">
        <span className="text-xs font-medium text-muted-foreground">
          {item.accuracy}% accuracy
        </span>
      </div>
    </div>
  );
};

export default HistoryCard;
