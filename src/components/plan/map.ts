import { type PinContentsType } from '@api/pins';

// 지도 가져오기
export const getMap = () => {
  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: new window.kakao.maps.LatLng(37.566826004661, 126.978652258309), // 지도의 중심좌표
    level: 4,
  };
  const map = new window.kakao.maps.Map(mapContainer, mapOption);

  const mapTypeControl = new window.kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
  const zoomControl = new window.kakao.maps.ZoomControl();
  map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
};

// 마커가 있는 지도 가져오기
export const getMarkerMap = (data: PinContentsType[]) => {
  console.log(data);
  const positions = data?.map((pin: PinContentsType) => {
    const position = {
      title: pin.placeName,
      latlng: new window.kakao.maps.LatLng(pin.lat, pin.lng),
    };
    return position;
  });
  console.log(positions[0]);

  const mapContainer = document.getElementById('map');
  const mapOption = {
    center: positions[0].latlng, // 지도의 중심좌표
    level: 4,
  };
  console.log(mapContainer);
  console.log(mapOption);
  const map = new window.kakao.maps.Map(mapContainer, mapOption);

  const mapTypeControl = new window.kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
  const zoomControl = new window.kakao.maps.ZoomControl();
  map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

  const imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

  const polyline = [];
  for (let i = 0; i < positions.length; i++) {
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const marker = new window.kakao.maps.Marker({
      map,
      position: positions[i].latlng,
      title: positions[i].title,
      image: markerImage,
    });

    polyline.push(positions[i].latlng);
  }

  const linePath = new window.kakao.maps.Polyline({
    path: polyline, // 선을 구성하는 좌표배열
    strokeWeight: 4, // 선의 두께
    strokeColor: 'black', // 선의 색깔
    strokeOpacity: 0.7, // 선의 불투명도, 1에서 0 사이의 값이며, 0에 가까울수록 투명
    strokeStyle: 'solid', // 선의 스타일
  });
  linePath.setMap(map);
};
