import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/useSessionStore";
import { useNavigate } from "react-router";

const ConfirmAlertDialog = ({
  category,
  amount,
  type,
  title,
}: {
  category: string;
  amount: string;
  type: string;
  title: string;
}) => {
  const { session } = useSessionStore();
  const navigate = useNavigate();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Start Quiz</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
            {session ? (
              <div className="space-y-2 text-gray-700">
                <p>
                  Hey{" "}
                  <span className="font-medium text-gray-900">
                    {session.user.user_metadata.full_name || session.user.email}
                  </span>
                  ! 👋
                </p>

                <p>
                  You're about to take a quiz with{" "}
                  <span className="font-medium text-blue-600">
                    {amount} questions
                  </span>
                  {type !== "any" && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="font-medium text-blue-600">
                        {type === "multiple"
                          ? "multiple choice"
                          : "true or false"}
                      </span>
                    </span>
                  )}
                  .
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  Are you ready? The quiz will begin once you click "Start
                  Quiz"!
                </p>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-amber-700 mb-2">
                  Oops! You need to log in first 🔐
                </p>
                <p className="text-sm text-gray-600">
                  Please sign in to start your quiz adventure.
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {session ? (
            <AlertDialogAction
              onClick={() =>
                navigate(
                  `/quiz?category=${category}&amount=${amount}&type=${type}&title=${encodeURIComponent(
                    title
                  )}`
                )
              }
            >
              Start Quiz
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              onClick={() => {
                navigate(
                  "/login?redirect=" +
                    encodeURIComponent(location.pathname + location.search)
                );
              }}
            >
              Login to Start
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmAlertDialog;
