import { HistoryType } from "@/lib/types.ts";

function tryParseJson(obj: any): HistoryType[] | null {
  let rs = null;

  try {
    rs = JSON.parse(obj);
  } catch (e) {
    // handle error
    console.log(e);
  }
  return rs;
}

export { tryParseJson };
