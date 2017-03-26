export default (arr, val, path = []) => {
  const transformedArr = arr.map((value) => {
    return path.reduce((result, prop) => {
      return result[prop];
    }, value);
  });
  const len = transformedArr.length;
  for (let i = 0; i < len; i += 1) {
    const actual = transformedArr[i];
    console.log(actual, val);
    if (actual === val) {
      return arr[i];
    }
  }
  return undefined;
};
