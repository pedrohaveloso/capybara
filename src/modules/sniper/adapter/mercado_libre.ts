import { Adapter } from "../adapter";
import { priceNumber } from "../formatter";
import { RawTarget } from "../get_data";

export const MercadoLibre: Adapter = {
  rawData(document: Document): RawTarget[] {
    const priceElements = document.querySelectorAll(
      `div.ui-search-item__group__element .ui-search-price .ui-search-price__second-line span[aria-roledescription="Preço"] span.andes-money-amount__fraction`
    );

    return Array.from(priceElements).map((element) => {
      const price = element.textContent ?? "";
      const cents =
        element.parentElement?.querySelector(".andes-money-amount__cents")
          ?.textContent ?? "00";

      return {
        price: priceNumber(price + cents),
        url: "",
      };
    });
  },
};
