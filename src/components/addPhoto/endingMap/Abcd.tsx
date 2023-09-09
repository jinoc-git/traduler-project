/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useState } from 'react';
import { CustomOverlayMap, Map, Polyline } from 'react-kakao-maps-sdk';

interface PositionType {
  lat: number;
  lng: number;
}

const Abcd = () => {
  const [isdrawing, setIsdrawing] = useState(false);
  const [clickLine, setClickLine] = useState<any>();
  const [paths, setPaths] = useState<PositionType[]>([]);
  const [distances, setDistances] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [moveLine, setMoveLine] = useState<any>();

  const handleClick = (
    _map: any,
    mouseEvent: { latLng: { getLat: () => any; getLng: () => any } },
  ) => {
    if (!isdrawing) {
      setDistances([]);
      setPaths([]);
    }
    setPaths((prev) => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    if (clickLine !== undefined && moveLine !== undefined) {
      console.log('1', clickLine);
      console.log('1', clickLine.getLenth());
      console.log('2', moveLine);
      console.log('2', moveLine.getLength());
      setDistances((prev) => [
        ...prev,
        Math.round(clickLine.getLength() + moveLine.getLength()),
      ]);
    }
    setIsdrawing(true);
  };

  const handleMouseMove = (
    _map: any,
    mouseEvent: { latLng: { getLat: () => any; getLng: () => any } },
  ) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  const handleRightClick = (_map: any, _mouseEvent: any) => {
    setIsdrawing(false);
  };

  const DistanceInfo = ({ distance }: { distance: any }) => {
    const walkkTime = (distance / 67) | 0;
    const bycicleTime = (distance / 227) | 0;

    return (
      <ul className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span>{' '}
          <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{' '}
          {walkkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{' '}
            </>
          )}
          <span className="number">{walkkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{' '}
          {bycicleTime > 60 && (
            <>
              <span className="number">{Math.floor(bycicleTime / 60)}</span>{' '}
              시간{' '}
            </>
          )}
          <span className="number">{bycicleTime % 60}</span> 분
        </li>
      </ul>
    );
  };

  return (
    <>
      {/* <CalculatePolylineDistanceStyle /> */}
      <Map // 지도를 표시할 Container
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: 37.498004414546934,
          lng: 127.02770621963765,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3} // 지도의 확대 레벨
        onClick={handleClick}
        onRightClick={handleRightClick}
        onMouseMove={handleMouseMove}
      >
        <Polyline
          path={paths}
          strokeWeight={3} // 선의 두께입니다
          strokeColor={'#db4040'} // 선의 색깔입니다
          strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle={'solid'} // 선의 스타일입니다
          onCreate={setClickLine}
        />
        {paths.map((path) => (
          <CustomOverlayMap
            key={`dot-${path.lat},${path.lng}`}
            position={path}
            zIndex={1}
          >
            <span className="dot"></span>
          </CustomOverlayMap>
        ))}
        {paths.length > 1 &&
          distances.slice(1, distances.length).map((distance, index) => (
            <CustomOverlayMap
              key={`distance-${paths[index + 1].lat},${paths[index + 1].lng}`}
              position={paths[index + 1]}
              yAnchor={1}
              zIndex={2}
            >
              {!isdrawing && distances.length === index + 2 ? (
                <DistanceInfo distance={distance} />
              ) : (
                <div className="dotOverlay">
                  거리 <span className="number">{distance}</span>m
                </div>
              )}
            </CustomOverlayMap>
          ))}
        <Polyline
          path={isdrawing ? [paths[paths.length - 1], mousePosition] : []}
          strokeWeight={3} // 선의 두께입니다
          strokeColor={'#db4040'} // 선의 색깔입니다
          strokeOpacity={0.5} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle={'solid'} // 선의 스타일입니다
          onCreate={setMoveLine}
        />
        {isdrawing && (
          <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
            <div className="dotOverlay distanceInfo">
              총거리{' '}
              <span className="number">
                {Math.round(clickLine.getLength() + moveLine.getLength())}
              </span>
              m
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </>
  );
};

export default Abcd;
