export const getQuery = (query) => {
  const queryParams = Object.entries(query).reverse();
  console.log(queryParams)
  let str = '?';
  for(let i = 0; i < queryParams.length; i++) {
    const obj = queryParams[i];
    str += `${obj[0]}=${obj[1]}&`
  }
  return str.slice(0, str.length - 1)
}