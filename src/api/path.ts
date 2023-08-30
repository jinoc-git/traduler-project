import axios from 'axios';

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
