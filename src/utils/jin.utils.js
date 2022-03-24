export const makeMap = v => {
  const obj = {};

  v.forEach(e => obj[e] = true);

  return k => !!obj[k];
}