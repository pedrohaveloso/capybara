import { Adapter } from "../adapter";
import { priceNumber } from "../formatter";
import { RawTarget } from "../get_data";

export const GoogleSearch: Adapter = {
  rawData(document: Document): RawTarget[] {
    const priceElements = document.querySelectorAll("span.a8Pemb.OFFNJ");

    return Array.from(priceElements).map((element) => {
      const price = element.textContent ?? "";

      const anchor = element.closest("a.shntl");

      const url = new URL(
        "https://google.com" +
          (anchor != null && "href" in anchor ? anchor.href : "")
      );

      return {
        price: priceNumber(price),
        url: url.searchParams.get("url") ?? "",
      };
    });
  },
};
