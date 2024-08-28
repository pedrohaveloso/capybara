import { Adapter } from "../adapter";
import { priceNumber } from "../price_number";
import { RawTarget } from "../raw_data";

export const GoogleSearchAdapter: Adapter = {
  rawData(document: Document): RawTarget[] {
    const priceElements = document.querySelectorAll("span.a8Pemb.OFFNJ");

    return Array.from(priceElements).map((element) => {
      const price = element.textContent ?? "";

      const anchor = element.closest("a.shntl");

      const url = new URL(
        "https://google.com" +
          (anchor instanceof HTMLAnchorElement ? anchor.href : "")
      );

      return {
        price: priceNumber(price),
        url: url.searchParams.get("url") ?? "",
      };
    });
  },
};
