import { writeFile } from "fs/promises";
import { request } from "./core/request";
import { getContent } from "./sniper/get_content";
import { getData } from "./sniper/get_data";
import { Source } from "./sniper/source";

export const sniper = async () => {
  // const [status, body] = await request("http://localhost:3000/");
  // if (status === "error") return;

  // const json = await body.json();

  const json = JSON.parse(
    '{"targets":[{"name":"XBOX Series X","sources":["GoogleSearch"]},{"name":"Iphone 15","sources":["GoogleSearch"]},{"name":"Ryzen 5","sources":["GoogleSearch"]},{"name":"Sofá 4 lugares","sources":["GoogleSearch"]},{"name":"Televisão 4k","sources":["GoogleSearch"]},{"name":"PlayStation 5","sources":["GoogleSearch"]},{"name":"MacBook Air M2","sources":["GoogleSearch"]},{"name":"Samsung Galaxy S24","sources":["GoogleSearch"]},{"name":"Echo Dot 5ª geração","sources":["GoogleSearch"]},{"name":"Smartwatch Garmin Fenix 7","sources":["GoogleSearch"]},{"name":"Cadeira Gamer DXRacer","sources":["GoogleSearch"]},{"name":"AirPods Pro 2ª geração","sources":["GoogleSearch"]},{"name":"Nintendo Switch OLED","sources":["GoogleSearch"]},{"name":"GoPro HERO11 Black","sources":["GoogleSearch"]},{"name":"Roteador ASUS RT-AX86U","sources":["GoogleSearch"]},{"name":"Teclado Mecânico Corsair K95","sources":["GoogleSearch"]},{"name":"Mouse Logitech G502","sources":["GoogleSearch"]},{"name":"Fone de Ouvido Sony WH-1000XM5","sources":["GoogleSearch"]},{"name":"Refrigerador Samsung Side-by-Side","sources":["GoogleSearch"]},{"name":"Aspirador de Pó Robô iRobot Roomba i7+","sources":["GoogleSearch"]},{"name":"Máquina de Café Nespresso Vertuo","sources":["GoogleSearch"]},{"name":"Fritadeira Sem Óleo Philips Airfryer XXL","sources":["GoogleSearch"]},{"name":"Câmara de Segurança Arlo Pro 4","sources":["GoogleSearch"]},{"name":"Cadeira de Escritório Secretlab Titan","sources":["GoogleSearch"]},{"name":"Xbox Series S","sources":["GoogleSearch"]},{"name":"Laptop Dell XPS 13","sources":["GoogleSearch"]},{"name":"Smart TV LG OLED65CX","sources":["GoogleSearch"]},{"name":"Celular Motorola Edge 40","sources":["GoogleSearch"]},{"name":"Home Theater Samsung HW-Q950A","sources":["GoogleSearch"]},{"name":"Ventilador Arno Turbo Silencioso","sources":["GoogleSearch"]},{"name":"Impressora Multifuncional HP OfficeJet Pro","sources":["GoogleSearch"]},{"name":"Roteador TP-Link Archer AX73","sources":["GoogleSearch"]},{"name":"Disco SSD Samsung 970 EVO","sources":["GoogleSearch"]},{"name":"Micro-ondas Panasonic NN-SN966S","sources":["GoogleSearch"]},{"name":"Máquina de Lavar LG Front Load","sources":["GoogleSearch"]},{"name":"Secadora de Roupas Brastemp","sources":["GoogleSearch"]},{"name":"Aquecedor Elétrico Cadence","sources":["GoogleSearch"]},{"name":"Câmera Mirrorless Sony Alpha a7 IV","sources":["GoogleSearch"]},{"name":"Tablet Samsung Galaxy Tab S9","sources":["GoogleSearch"]},{"name":"Bicicleta Elétrica Caloi E-bike","sources":["GoogleSearch"]},{"name":"Fone de Ouvido JBL Tune 750BT","sources":["GoogleSearch"]},{"name":"Relógio Smartwatch Fitbit Sense","sources":["GoogleSearch"]},{"name":"Mochila para Notebook Targus","sources":["GoogleSearch"]},{"name":"Cafeteira Expresso De Longhi","sources":["GoogleSearch"]},{"name":"Centrífuga de Alimentos Philips","sources":["GoogleSearch"]},{"name":"Torradeira Oster","sources":["GoogleSearch"]},{"name":"Cadeira de Carro Infantil Burigotto","sources":["GoogleSearch"]},{"name":"Bolsa de Estudos Samsung Galaxy Book","sources":["GoogleSearch"]},{"name":"Manta Elétrica Arno","sources":["GoogleSearch"]},{"name":"Reprodutor de Blu-ray LG UBK90","sources":["GoogleSearch"]},{"name":"Umidificador de Ar Philips","sources":["GoogleSearch"]},{"name":"Conjunto de Panelas Tramontina","sources":["GoogleSearch"]},{"name":"Assadeira Britânia","sources":["GoogleSearch"]},{"name":"Purificador de Ar Consul","sources":["GoogleSearch"]},{"name":"Tábua de Corte Tramontina","sources":["GoogleSearch"]},{"name":"Chromecast Google TV","sources":["GoogleSearch"]},{"name":"Grill Elétrico George Foreman","sources":["GoogleSearch"]},{"name":"Máquina de Costura Singer","sources":["GoogleSearch"]},{"name":"Bolsa de Viagem Samsonite","sources":["GoogleSearch"]},{"name":"Câmera de Ação DJI Osmo Action","sources":["GoogleSearch"]},{"name":"Mixer Philips Walita","sources":["GoogleSearch"]},{"name":"Cafeteira Italiana Bialetti","sources":["GoogleSearch"]},{"name":"Feijão Preto Saboroso","sources":["GoogleSearch"]},{"name":"Secador de Cabelo Philips","sources":["GoogleSearch"]},{"name":"Cadeira de Escritório Flexform","sources":["GoogleSearch"]},{"name":"Liquidificador Oster","sources":["GoogleSearch"]},{"name":"Cervejeira Consul","sources":["GoogleSearch"]},{"name":"Panela de Pressão Tramontina","sources":["GoogleSearch"]},{"name":"Rechaud de Prata","sources":["GoogleSearch"]},{"name":"Assento Sanitário Eletrônico","sources":["GoogleSearch"]},{"name":"Lanterna LED Energizer","sources":["GoogleSearch"]},{"name":"Escova de Cabelo Philips","sources":["GoogleSearch"]},{"name":"Relógio de Parede Imaginarium","sources":["GoogleSearch"]},{"name":"Espresso Coffee Maker","sources":["GoogleSearch"]},{"name":"Aquecedor de Água Lorenzetti","sources":["GoogleSearch"]},{"name":"Batedeira KitchenAid","sources":["GoogleSearch"]},{"name":"Capinha para Celular OtterBox","sources":["GoogleSearch"]},{"name":"Câmera de Vigilância TP-Link","sources":["GoogleSearch"]},{"name":"Torradeira Philips","sources":["GoogleSearch"]},{"name":"Fone de Ouvido Bose QuietComfort","sources":["GoogleSearch"]},{"name":"Assadeira de Silicone","sources":["GoogleSearch"]},{"name":"Mesa de Jantar 8 Lugares","sources":["GoogleSearch"]}]}'
  );

  const targets = json["targets"] as Array<{
    name: string;
    sources: Array<string>;
  }>;

  const data = async (source: Source, name: string) => {
    const content = await getContent(source, name);
    return getData(source, content);
  };

  const allTargets = targets
    .map((target) =>
      target.sources.map((source) => ({ name: target.name, source: source }))
    )
    .flat(1);

  const fns = allTargets.map(
    (target) => async () =>
      await data(Source[target.source as Source], target.name)
  );

  const raw = await Promise.all(fns.map((fn) => fn()));

  await writeFile(
    `./tmp/raw_data_${Date.now()}.json`,
    JSON.stringify(raw.flat(1))
  );
};
