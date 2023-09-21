function useFormatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (date) {
    const from = date.toLocaleDateString(undefined, options).split(", ");
    return `${from[1]}, ${from[2]}`;
  }

  return undefined;
}

export default useFormatDate;
