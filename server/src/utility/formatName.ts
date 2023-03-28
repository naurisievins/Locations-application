export const formatName = (name: string) => {
  let resultName = name.trim();
  resultName = resultName[0].toUpperCase() + resultName.slice(1);

  return resultName;
};
