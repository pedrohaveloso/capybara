import { RawTarget } from "./get_data";

export type Adapter = {
  rawData(document: Document): RawTarget[];
};
