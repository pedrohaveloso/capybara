import { writeFile } from "fs/promises";
import { request } from "./core/request";
import { getContent } from "./sniper/get_content";
import { getData } from "./sniper/get_data";
import { Source } from "./sniper/source";

export const sniper = async () => {
  // const [status, body] = await request("http://localhost:3000/");
  // if (status === "error") return;

  // const json = await body.json();

  let json = JSON.parse(
    '{"targets":[{"name":"XBOX Series X","sources":["MercadoLibre"]},{"name":"Iphone 15","sources":["MercadoLibre"]},{"name":"Ryzen 5","sources":["MercadoLibre"]},{"name":"Sofá 4 lugares","sources":["MercadoLibre"]},{"name":"Televisão 4k","sources":["MercadoLibre"]},{"name":"PlayStation 5","sources":["MercadoLibre"]},{"name":"MacBook Air M2","sources":["MercadoLibre"]},{"name":"Samsung Galaxy S24","sources":["MercadoLibre"]},{"name":"Echo Dot 5ª geração","sources":["MercadoLibre"]},{"name":"Smartwatch Garmin Fenix 7","sources":["MercadoLibre"]},{"name":"Cadeira Gamer DXRacer","sources":["MercadoLibre"]},{"name":"AirPods Pro 2ª geração","sources":["MercadoLibre"]},{"name":"Nintendo Switch OLED","sources":["MercadoLibre"]},{"name":"GoPro HERO11 Black","sources":["MercadoLibre"]},{"name":"Roteador ASUS RT-AX86U","sources":["MercadoLibre"]},{"name":"Teclado Mecânico Corsair K95","sources":["MercadoLibre"]},{"name":"Mouse Logitech G502","sources":["MercadoLibre"]},{"name":"Fone de Ouvido Sony WH-1000XM5","sources":["MercadoLibre"]},{"name":"Refrigerador Samsung Side-by-Side","sources":["MercadoLibre"]},{"name":"Aspirador de Pó Robô iRobot Roomba i7+","sources":["MercadoLibre"]},{"name":"Máquina de Café Nespresso Vertuo","sources":["MercadoLibre"]},{"name":"Fritadeira Sem Óleo Philips Airfryer XXL","sources":["MercadoLibre"]},{"name":"Câmara de Segurança Arlo Pro 4","sources":["MercadoLibre"]},{"name":"Cadeira de Escritório Secretlab Titan","sources":["MercadoLibre"]},{"name":"Xbox Series S","sources":["MercadoLibre"]},{"name":"Laptop Dell XPS 13","sources":["MercadoLibre"]},{"name":"Smart TV LG OLED65CX","sources":["MercadoLibre"]},{"name":"Celular Motorola Edge 40","sources":["MercadoLibre"]},{"name":"Home Theater Samsung HW-Q950A","sources":["MercadoLibre"]},{"name":"Ventilador Arno Turbo Silencioso","sources":["MercadoLibre"]},{"name":"Impressora Multifuncional HP OfficeJet Pro","sources":["MercadoLibre"]},{"name":"Roteador TP-Link Archer AX73","sources":["MercadoLibre"]},{"name":"Disco SSD Samsung 970 EVO","sources":["MercadoLibre"]},{"name":"Micro-ondas Panasonic NN-SN966S","sources":["MercadoLibre"]},{"name":"Máquina de Lavar LG Front Load","sources":["MercadoLibre"]},{"name":"Secadora de Roupas Brastemp","sources":["MercadoLibre"]},{"name":"Aquecedor Elétrico Cadence","sources":["MercadoLibre"]},{"name":"Câmera Mirrorless Sony Alpha a7 IV","sources":["MercadoLibre"]},{"name":"Tablet Samsung Galaxy Tab S9","sources":["MercadoLibre"]},{"name":"Bicicleta Elétrica Caloi E-bike","sources":["MercadoLibre"]},{"name":"Fone de Ouvido JBL Tune 750BT","sources":["MercadoLibre"]},{"name":"Relógio Smartwatch Fitbit Sense","sources":["MercadoLibre"]},{"name":"Mochila para Notebook Targus","sources":["MercadoLibre"]},{"name":"Cafeteira Expresso De Longhi","sources":["MercadoLibre"]},{"name":"Centrífuga de Alimentos Philips","sources":["MercadoLibre"]},{"name":"Torradeira Oster","sources":["MercadoLibre"]},{"name":"Cadeira de Carro Infantil Burigotto","sources":["MercadoLibre"]},{"name":"Bolsa de Estudos Samsung Galaxy Book","sources":["MercadoLibre"]},{"name":"Manta Elétrica Arno","sources":["MercadoLibre"]},{"name":"Reprodutor de Blu-ray LG UBK90","sources":["MercadoLibre"]},{"name":"Umidificador de Ar Philips","sources":["MercadoLibre"]},{"name":"Conjunto de Panelas Tramontina","sources":["MercadoLibre"]},{"name":"Assadeira Britânia","sources":["MercadoLibre"]},{"name":"Purificador de Ar Consul","sources":["MercadoLibre"]},{"name":"Tábua de Corte Tramontina","sources":["MercadoLibre"]},{"name":"Chromecast Google TV","sources":["MercadoLibre"]},{"name":"Grill Elétrico George Foreman","sources":["MercadoLibre"]},{"name":"Máquina de Costura Singer","sources":["MercadoLibre"]},{"name":"Bolsa de Viagem Samsonite","sources":["MercadoLibre"]},{"name":"Câmera de Ação DJI Osmo Action","sources":["MercadoLibre"]},{"name":"Mixer Philips Walita","sources":["MercadoLibre"]},{"name":"Cafeteira Italiana Bialetti","sources":["MercadoLibre"]},{"name":"Feijão Preto Saboroso","sources":["MercadoLibre"]},{"name":"Secador de Cabelo Philips","sources":["MercadoLibre"]},{"name":"Cadeira de Escritório Flexform","sources":["MercadoLibre"]},{"name":"Liquidificador Oster","sources":["MercadoLibre"]},{"name":"Cervejeira Consul","sources":["MercadoLibre"]},{"name":"Panela de Pressão Tramontina","sources":["MercadoLibre"]},{"name":"Rechaud de Prata","sources":["MercadoLibre"]},{"name":"Assento Sanitário Eletrônico","sources":["MercadoLibre"]},{"name":"Lanterna LED Energizer","sources":["MercadoLibre"]},{"name":"Escova de Cabelo Philips","sources":["MercadoLibre"]},{"name":"Relógio de Parede Imaginarium","sources":["MercadoLibre"]},{"name":"Espresso Coffee Maker","sources":["MercadoLibre"]},{"name":"Aquecedor de Água Lorenzetti","sources":["MercadoLibre"]},{"name":"Batedeira KitchenAid","sources":["MercadoLibre"]},{"name":"Capinha para Celular OtterBox","sources":["MercadoLibre"]},{"name":"Câmera de Vigilância TP-Link","sources":["MercadoLibre"]},{"name":"Torradeira Philips","sources":["MercadoLibre"]},{"name":"Fone de Ouvido Bose QuietComfort","sources":["MercadoLibre"]},{"name":"Assadeira de Silicone","sources":["MercadoLibre"]},{"name":"Mesa de Jantar 8 Lugares","sources":["MercadoLibre"]}]}'
  );

  json = JSON.parse(
    '{"targets":[{"name":"papel", "sources":["MercadoLibre"]}]}'
  );

  const targets = json["targets"] as Array<{
    name: string;
    sources: Array<string>;
  }>;
  console.log(targets);

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
