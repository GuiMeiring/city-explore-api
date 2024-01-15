import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as OpenCage from 'opencage-api-client';

const cityName = 'Jaraguá do Sul, BR';  // Substitua pelo nome da cidade desejada
const apiKey = 'd6af03ab54cef4f225044ce155bff8fe';  // Substitua pela sua chave de API do OpenWeatherMap


export const getWheather =async (req: Request, res: Response) => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=pt&appid=${apiKey}`;

axios.get(apiUrl)
    .then(response => {
        const weatherData = response.data;
        console.log(`Cidade: ${weatherData.name}`);
        console.log(`País: ${weatherData.sys.country}`);
        console.log(`Condição Atual: ${weatherData.weather[0].description}`);
        console.log(`Temperatura Atual: ${weatherData.main.temp}°C`);
        console.log(`Umidade: ${weatherData.main.humidity}%`);
        res.status(StatusCodes.OK).json(weatherData);
    })
    .catch(error => {
        console.error(error);
    });
    
}


export const getoordenadas =async (req: Request, res: Response) => {


    const apiKey = '8583a0fbd39e45809b32d7f841757024';
    
    async function obterCoordenadasDaCidade(nomeCidade: string): Promise<{ lat: number; lng: number }> {

    
      try {
        const response = await OpenCage.geocode({ q: nomeCidade, key: apiKey });
        const { geometry } = response.results[0];
    
        return { lat: geometry.lat, lng: geometry.lng };
      } catch (error) {
        console.error('Erro ao obter coordenadas da cidade:', error);
        throw error;
      }
    }
    
    // Exemplo de uso:
    const nomeCidade = 'Jaraguá do Sul';
    obterCoordenadasDaCidade(nomeCidade)
      .then((coordenadas) => {
        console.log('Coordenadas da cidade:', coordenadas);
        res.status(StatusCodes.OK).json(coordenadas);
      })
      .catch((error) => {
        console.error('Erro:', error.message);
      });
    

    
}

// export const getpontos =async (req: Request, res: Response) => {


//     // async function obterInformacoesLocal(nomeDoLocal: String) {
//     //     try {
//     //       const resposta = await axios.get(`https://nominatim.openstreetmap.org/search`, {
//     //         params: {
//     //           q: nomeDoLocal,
//     //           format: 'json',
//     //           'accept-language': 'pt',
//     //         },
//     //       });
      
//     //       // Exibindo os resultados
//     //       console.log('Resultados:', resposta.data);
//     //     } catch (erro) {
//     //       console.error('Erro ao obter informações do local:', erro);
//     //     }
//     //   }
      
//     //   // Exemplo de uso
//     //   const nomeDoLocal = 'Jaraguá do Sul';
//     //   obterInformacoesLocal(nomeDoLocal);
//     //}
// }
// export const getpontos = async (req: Request, res: Response) => {
//     interface PontoTuristico {
//       properties: {
//         name: string;
//         kinds: string;
//         wikipedia_extracts?: {
//           text: string;
//         };
//       };
//     }
  
//     async function obterPontosTuristicos(lat: number, lon: number, raio: number = 20): Promise<void> {
//       try {
//         const resposta: AxiosResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
//           params: {
//             apikey: '5ae2e3f221c38a28845f05b6db628824924f888c819f0f322eec138f', // Substitua com sua chave
//             lat,
//             lon,
//             radius: raio,
//             format: 'json',
//             lang: 'pt',
//           },
//         });
  
//         // Exibindo pontos turísticos
//         console.log(resposta.data);
  
//         if (resposta.data.features && Array.isArray(resposta.data.features)) {
//             const pontosTuristicos: PontoTuristico[] = resposta.data.features.map((feature: any) => feature.properties);
      
//             res.json({ pontosTuristicos });
//           } else {
//             console.error('A resposta da API não contém features ou não é um array.');
//             res.status(500).json({ error: 'Erro ao obter pontos turísticos' });
//           }
//         // pontosTuristicos.forEach((ponto: PontoTuristico, index: number) => {
//         //   console.log(`${index + 1}. ${ponto.properties.name}`);
//         //   console.log(`   Categoria: ${ponto.properties.kinds}`);
//         //   console.log(`   Descrição: ${ponto.properties.wikipedia_extracts ? ponto.properties.wikipedia_extracts.text : 'N/A'}\n`);
//         // });
//       } catch (erro) {
//         console.error('Erro ao obter pontos turísticos:', erro);
//       }
//     }
  
//     // Exemplo de uso
//     const latitude: number = -23.5505; // Coordenadas de São Paulo
//     const longitude: number = -46.6333;
//     await obterPontosTuristicos(latitude, longitude);
//   };


export const getpontos = async (req: Request, res: Response) => {
    interface PontoTuristico {
      xid: string;
      name: string;
      dist: number;
      rate: number;
      wikidata: string;
      kinds: string;
      point: {
        lon: number;
        lat: number;
      };
    }
  
    async function obterPontosTuristicos(lat: number, lon: number, raio: number = 10000): Promise<void> {

    try {
      const resposta: AxiosResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
        params: {
          apikey: '5ae2e3f221c38a28845f05b6db628824924f888c819f0f322eec138f', // Substitua com sua chave
          lat,
          lon,
          radius: raio,
          format: 'json',
          lang: 'pt',
        },
      });
  
      console.log(resposta.data);

        if (Array.isArray(resposta.data)) {
            const pontosTuristicos: PontoTuristico[] = resposta.data
                .filter((ponto: PontoTuristico) => ponto.name); // Filtra pontos sem nome

            res.json({ pontosTuristicos });
        } else {
            console.error('A resposta da API não é um array ou está vazia.');
            res.status(500).json({ error: 'Erro ao obter pontos turísticos' });
        }
    } catch (erro) {
      console.error('Erro ao obter pontos turísticos:', erro);
      res.status(500).json({ error: 'Erro ao obter pontos turísticos' });


    }
}

    const latitude: number = -26.4897432; // Coordenadas de São Paulo
    const longitude: number = -49.0778063;
    await obterPontosTuristicos(latitude, longitude);
  };

  export const getCityInfo = async (req: Request, res: Response) => {
    async function getWikipediaInfo(nomeCidade: string): Promise<any> {
        try {
            // Configurar a URL da API da Wikipedia
            const apiUrl = `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${nomeCidade}&exintro=true`;

            // Fazer a solicitação para a API da Wikipedia
            const response = await axios.get(apiUrl);

            // Extrair informações da resposta da API
            const pages = response.data.query.pages;
            const pageId = Object.keys(pages)[0];
            const cidadeInfo = pages[pageId];

            if (!cidadeInfo || cidadeInfo.missing !== undefined) {
                console.log('Página da cidade não encontrada na Wikipedia');
                res.status(StatusCodes.NOT_FOUND).json({ message: 'Página da cidade não encontrada na Wikipedia' });
                return;
            }

            console.log('Informações da cidade:', cidadeInfo);
            res.status(StatusCodes.OK).json({ cidadeInfo });
            return cidadeInfo;
        } catch (error) {
            console.error('Erro ao buscar informações da cidade na Wikipedia:', error);
            throw error;
        }
    }

    // Exemplo de uso
    const nomeCidade = 'Jaraguá do Sul'; // Substitua pelo nome da cidade desejada
    await getWikipediaInfo(nomeCidade)
        .then((cidadeInfo) => {
            // Faça o que desejar com as informações da cidade
        })
        .catch((error) => {
            console.error('Erro geral:', error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao buscar informações da cidade na Wikipedia' });
        });
};


  
    
    


