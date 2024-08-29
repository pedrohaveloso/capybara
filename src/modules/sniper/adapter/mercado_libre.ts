import { Adapter } from "../adapter";
import { priceNumber } from "../formatter";
import { RawTarget } from "../get_data";

export const MercadoLibre: Adapter = {
  rawData(document: Document): RawTarget[] {
    const priceElements = document.querySelectorAll(
      'span[aria-hiden="true"].andes-money-amount__fraction'
    );

    return Array.from(priceElements).map((element) => {
      const price = element.textContent ?? "";

      return {
        price: priceNumber(price),
        url: "",
      };
    });
  },
};
