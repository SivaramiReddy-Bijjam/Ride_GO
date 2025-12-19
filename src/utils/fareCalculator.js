export function calculateFare(distanceKm, ratePerKm) {
  const baseFare = 50; // fixed
  return baseFare + distanceKm * ratePerKm;
}
