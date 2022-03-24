export const makeMap = v => {
  const obj = {};

  v.forEach(e => obj[e] = false);

  return k => !!obj[k];
}