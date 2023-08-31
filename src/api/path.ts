import axios from 'axios';

import { type PinContentsType } from './pins';

interface Parameters {
  origin: string;
  destination: string;
}

interface Route {
  summary: {
    distance: number;
  };
}

interface Routes {
  routes: Route[];
}

export const getPath = async (params: Parameters) => {
  const { data } = await axios.get<Routes>(
    'https://apis-navi.kakaomobility.com/v1/directions',
    {
      headers: {
        Authorization: `KakaoAK ${
          process.env.REACT_APP_MOBILITY_KEY as string
        }`,
      },
      params,
    },
  );

  return data.routes[0].summary.distance;
};

export const calcPath = async (distance: PinContentsType[]) => {
  const convertParameters = distance.map(({ lng, lat }) => {
    if (lat !== undefined && lng !== undefined) {
      return `${lng},${lat}`;
    }
    return undefined;
  });

  const newData: string[] = [];

  for (let i = 0; i < convertParameters.length; i += 1) {
    if (i === convertParameters.length - 1) {
      break;
    }

    try {
      const data = await getPath({
        origin: convertParameters[i] as string,
        destination: convertParameters[i + 1] as string,
      });

      const distanceInKm = data / 1000;
      newData.push(distanceInKm.toFixed(1));
    } catch (err) {
      console.log(err);
    }
  }

  return newData;
};

// export const calcAllPath = async (distance: PinContentsType[][]) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const convertParameters = [];
//   for (const pinArr of distance) {
//     const pinsOfDate = [];
//     for (const data of pinArr) {
//       const { lat, lng } = data;
//       if (lat !== undefined && lng !== undefined) {
//         pinsOfDate.push(`${lng},${lat}`);
//       }
//     }
//     convertParameters.push(pinsOfDate);
//   }

//   const newData = [];

//   for (const data of convertParameters) {
//     const oneDay = [];
//     for (let i = 0; i < data.length - 1; i++) {
//       try {
//         const result = await getPath({
//           origin: data[i],
//           destination: data[i + 1],
//         });

//         const distanceInKm = result / 1000;
//         oneDay.push(+distanceInKm.toFixed(1));
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     newData.push(oneDay);
//   }

//   console.log('!!new data!!: ', newData);
//   return newData;
// };
