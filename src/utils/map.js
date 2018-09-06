import mapboxgl from 'mapbox-gl';

export const makePoint = coords => ({
  type: 'Point',
  coordinates: coords
});

const START_DATE = '2017-09-15';
const END_DATE = '2017-12-06';

const padNum = num => num < 10 ? `0${num}` : `${num}`;

const getDate = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${padNum(date.getMonth()+1)}-${padNum(date.getDate())}`;
}

export const makeStages = (start = START_DATE, end = END_DATE) => {
  const dates = [];
  let time = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  while (time <= endTime) {
    dates.push(getDate(time));
    time += 1000 * 60 * 60 * 24;
  }
  return dates;
}

export const makeEmptyJsonLine = () =>
  JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"LineString","coordinates":[]}}]}')

export const getBounds = (coords) => {
  const bounds = new mapboxgl.LngLatBounds()
  coords.forEach(bounds.extend.bind(bounds));
  return bounds;
};

export const getCoords = data => data.features[0].geometry.coordinates;

export const distance = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))