import DeleteButton from "@/components/myui/deleteButton.tsx";
import SearchButton from "@/components/myui/searchButton.tsx";
import { AppContext } from "@/context/appContext.ts";
import { HistoryRecord, OpenWeatherQuery } from "@/lib/types.ts";
import { useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

let _record: HistoryRecord | null = null; // temp store

export default function SearchHistorySection() {
  const appContext = useContext(AppContext);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  function promptDelete(x: HistoryRecord) {
    setShowPrompt(true);
    _record = { ...x };
  }

  function removeRecord(record: HistoryRecord) {
    let idx = appContext.histories?.findIndex((x) => x.id === record.id) || -1;
    if (idx !== -1 && appContext.histories) {
      const h = [...appContext.histories];
      h.splice(idx, 1);
      appContext.setHistories(h);
    }

    _record = null;
    setShowPrompt(false);
  }

  function searchAgain(record: HistoryRecord) {
    if (record.query) {
      const s = record?.query.split(",");
      const query: OpenWeatherQuery = { city: s[0], country: s[1] };
      appContext?.setQuery(query);
    }
  }

  return (
    <>
      <section>
        <h2 className={"border-b border-b-gray-400 mb-2 text-xl font-bold"}>
          Search History
        </h2>
      </section>
      {appContext?.histories && (
        <ol>
          {appContext.histories.map((x, idx) => (
            <li
              key={x.id + idx}
              className={"flex justify-between items-center my-4"}
            >
              <div className="query">
                {idx + 1}. {x.query}
              </div>
              <div className="action flex items-center space-x-2">
                <span>{x.time}</span>
                <SearchButton onClick={() => searchAgain(x)} />
                <DeleteButton onClick={() => promptDelete(x)} />
              </div>
            </li>
          ))}
        </ol>
      )}

      {!appContext.histories && (
        <h2 className={"flex justify-center"}>No Records</h2>
      )}

      {showPrompt && (
        <AlertDialog open={showPrompt}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Record will be removed from
                localStorage.
              </AlertDialogDescription>
              <AlertDialogDescription className={"text-red-400"}>
                {_record?.query}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setShowPrompt(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  removeRecord(_record!);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
