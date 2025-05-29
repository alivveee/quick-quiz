import SelectField from "@/components/SelectField";
import { useState } from "react";
import ConfirmAlertDialog from "../components/AlertDialog";
import { useSearchParams } from "react-router";

const QuizStartPage = () => {
  const [amount, setAmount] = useState("10");
  const [type, setType] = useState("any");

  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const category = searchParams.get("category");

  const questionOptions = [
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15", value: "15" },
    { label: "20", value: "20" },
  ];

  const typeOptions = [
    { label: "Multiple Choice", value: "multiple" },
    { label: "Any Type", value: "any" },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-row items-center justify-center w-[200px] border-1 mt-[-40px] bg-primary p-1 rounded-sm text-white font-bold">
          Your Quiz
        </div>
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex flex-wrap justify-center w-full gap-2">
          <SelectField
            label="Number of Questions"
            options={questionOptions}
            placeholder="Number of Questions"
            value={amount}
            onChange={setAmount}
          />
          <SelectField
            label="Type"
            options={typeOptions}
            placeholder="Select Type"
            value={type}
            onChange={setType}
          />
        </div>
        <ConfirmAlertDialog
          amount={amount}
          type={type}
          category={category!}
          title={title!}
        />
      </div>
    </div>
  );
};

export default QuizStartPage;
