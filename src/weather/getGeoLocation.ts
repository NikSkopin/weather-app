const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos: GeolocationPosition) {
  const { latitude, longitude } = pos.coords;
  return { latitude, longitude }
}

function error(err: GeolocationPositionError) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default function getGeo() : void {
  return navigator.geolocation.getCurrentPosition(success, error, options);
}
