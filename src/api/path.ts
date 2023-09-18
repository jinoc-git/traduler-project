import axios from 'axios';

import { type PinContentsType } from './pins';

interface Parameters {
  origin: string;
  destination: string;
}

interface Route {
  result_code: number;
  result_msg: string;
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
  if (data.routes[0].result_code === 0) {
    return data.routes[0].summary.distance;
  } else {
    return 0;
  }
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
      throw new Error('카카오 모빌리티 거리 계산 오류');
    }
  }

  return newData;
};
