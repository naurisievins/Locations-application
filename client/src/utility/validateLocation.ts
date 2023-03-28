import { NewLocation } from "../components/AddForm/AddForm";

export const validateLocation = (newLocation: NewLocation) => {
  const name = newLocation.name.trim();
  const lat = newLocation.latitude;
  const long = newLocation.longitude;

  const isValidInput = {
    name: false,
    latitude: false,
    longitude: false,
  };

  if (name && name.length <= 15) {
    isValidInput.name = true;
  }

  if (lat >= -90 && lat <= 90 && String(lat).replace("-", "").length <= 10) {
    isValidInput.latitude = true;
  }

  if (
    long >= -180 &&
    long <= 180 &&
    String(long).replace("-", "").length <= 10
  ) {
    isValidInput.longitude = true;
  }

  return isValidInput;
};
