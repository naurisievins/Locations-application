import { NewLocation } from "../components/AddForm/AddForm";

const maxNameLength = 15;
const maxLatLongLength = 10;
const latMin = -90;
const latMax = 90;
const longMin = -180;
const longMax = 180;

export const validateLocation = (newLocation: NewLocation) => {
  const name = newLocation.name.trim();
  const lat = newLocation.latitude;
  const long = newLocation.longitude;

  const isValidInput = {
    name: false,
    latitude: false,
    longitude: false,
  };

  if (name && name.length <= maxNameLength) {
    isValidInput.name = true;
  }

  if (
    lat >= latMin &&
    lat <= latMax &&
    String(lat).replace("-", "").length <= maxLatLongLength
  ) {
    isValidInput.latitude = true;
  }

  if (
    long >= longMin &&
    long <= longMax &&
    String(long).replace("-", "").length <= maxLatLongLength
  ) {
    isValidInput.longitude = true;
  }

  return isValidInput;
};
