import haversine from "haversine-distance";

export function DistanceCoordinates(
  from: { latitude: number; longitude: number },
  to: { latitude: number; longitude: number }
) {
  const distanceInMeters = haversine(from, to);
  const distanceInKilometers = distanceInMeters / 1000;
  return distanceInKilometers;
}