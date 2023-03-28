export const validateName = (name: string) => {
  let validName = name.trim();

  if (validName.length <= 15) {
    return true;
  }

  return false;
};

export const validateLatLong = (
  latLong: number,
  rangeFrom: number,
  rangeTo: number
) => {
  if (
    String(latLong).replace("-", "").length <= 10 &&
    latLong >= rangeFrom &&
    latLong <= rangeTo
  ) {
    return true;
  }

  return false;
};
