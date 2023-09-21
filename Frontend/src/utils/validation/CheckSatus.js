export default function CheckStatus(status) {
  const successRegex = /2\d\d/g;
  const unAuthorRegex = /4\d\d/g;
  const internalRegex = /5\d\d/g;
  if (successRegex.test(status)) {
    return true;
  } else if (unAuthorRegex.test(status) || internalRegex.test(status)) {
    return false;
  }
}
