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
import { FileText, X } from "lucide-react";

type Props = {
  handleReportGeneration: () => void;
  isPending: boolean;
};

export const GenerateReport = ({
  handleReportGeneration,
  isPending,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="m-2 flex w-fit items-center gap-2 bg-indigo-500 text-xs hover:bg-indigo-600">
          <FileText className="h-4 w-4" />
          Generate Report Session
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Generate Report Session</AlertDialogTitle>
          <AlertDialogDescription>
            This will generate a report of the session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            <X className="h-4 w-4" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleReportGeneration}
          >
            <FileText className="h-4 w-4" />
            Generate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
