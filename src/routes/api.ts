const BASE_URL = `https://api.coinpaprika.com/v1`


export function fetchTikers() {
  return fetch(`${BASE_URL}/tickers`)
  .then((response) => response.json()
  );  
}

export function fetchCoinInfo(coinId:string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`)
  .then((response) => response.json()
  );  
}

export function fetchCoinTikers(coinId:string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`)
  .then((response) => response.json()
  );  
}

export function fetchCoinHistory(coinId:string | undefined) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 28;
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
  .then((response) => response.json()
  );
}

export function fetchCoinToday(coinId:string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today/`)
  .then((response) => response.json()
  );
}