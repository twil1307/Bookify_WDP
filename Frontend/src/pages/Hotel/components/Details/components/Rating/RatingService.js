export const getPoints = (reviews = []) => {
  const accuracyPoint = Math.floor(
    reviews.reduce((prev, cur) => cur.accuracyPoint + prev, 0) / reviews.length
  );
  const locationPoint = Math.floor(
    reviews.reduce((prev, cur) => cur.locationPoint + prev, 0) / reviews.length
  );
  const valuePoint = Math.floor(
    reviews.reduce((prev, cur) => cur.valuePoint + prev, 0) / reviews.length
  );
  const communicationPoint = Math.floor(
    reviews.reduce((prev, cur) => cur.communicationPoint + prev, 0) /
      reviews.length
  );

  return { accuracyPoint, locationPoint, valuePoint, communicationPoint };
};
