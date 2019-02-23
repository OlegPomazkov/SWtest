export function getShipId(url) {
  let arr = url.split('/')

  return arr[arr.length-2]
}
