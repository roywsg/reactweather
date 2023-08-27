import { AppContext } from "@/context/appContext.ts";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Icons = {
  spinner: Loader2,
};

export default function Loading() {
  const appContext = useContext(AppContext);
  const [isLoading, setLoading] = useState(appContext?.isLoading);

  useEffect(() => {
    setLoading(appContext?.isLoading);
  }, [appContext?.isLoading]);

  if (isLoading) {
    return createPortal(
      <div
        className={
          "absolute top-0 left-0 backdrop-opacity-5 bg-black/30 w-full h-full flex justify-center items-center"
        }
      >
        <Icons.spinner className={"h-4 w-4 animate-spin"} />
      </div>,
      document.body,
    );
  } else {
    return null;
  }
}
