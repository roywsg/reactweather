import { Constants } from "@/lib/constants.ts";
import { HistoryRecord } from "@/lib/types.ts";

function tryParseJson(obj: any): HistoryRecord[] | null {
  let rs = null;

  try {
    rs = JSON.parse(obj);
  } catch (e) {
    // handle error
    console.error(e);
  }
  return rs;
}

function getLocalHistories() {
  let h = window.localStorage.getItem(Constants.History.storageKey);
  return tryParseJson(h);
}

export { tryParseJson, getLocalHistories };
