import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router";

const QuizStartPage = () => {
  const navigate = useNavigate(); // initialize navigate

  const onStartQuiz = () => {
    navigate("/quiz/1"); // programmatic navigation
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-row items-center justify-center w-[200px] border-1 mt-[-40px] bg-primary p-1 rounded-sm text-white font-bold">
          Your Quiz
        </div>
        <h1 className="text-xl font-bold">General Knowlege</h1>
        <div className="flex justify-between w-full gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Number of questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">any type</SelectItem>
              <SelectItem value="10">multiple choice</SelectItem>
              <SelectItem value="15">true or false</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onStartQuiz} className="w-full font-bold">Start</Button>
      </div>
    </div>
  );
};

export default QuizStartPage;
