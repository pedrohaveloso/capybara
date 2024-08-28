import { RawTarget } from "./raw_data";

export type Adapter = {
  rawData(document: Document): RawTarget[];
};
