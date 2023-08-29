import axios from 'axios';

import { type PinContentsType } from './pins';

interface Parameters {
  origin: string;
  destination: string;
}

export const getPath = async (params: Parameters) => {
  const { data } = await axios.get(
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

export const calcPath = async (pinArr: PinContentsType[]) => {
  const convertParameters = pinArr.map(({ lng, lat }) => {
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

  return newData
};
