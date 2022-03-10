function getFromCache(url) {
  return JSON.parse(localStorage.getItem(url))
}

function addToCache(url, data) {
  localStorage.setItem(url, JSON.stringify(data))
}

export default async function friendlyFetch(url) {
  let data = getFromCache(url)
  if (!data) {
    const response = await fetch(url)
    data = await response.json()
    
    addToCache(url, data)
  } else {
    console.info('Loaded from cache and saved some bytes 🐰')
  }

  return data
}