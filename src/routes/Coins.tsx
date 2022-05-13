import styled from "styled-components";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchTikers } from "./api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li<{isPositive:boolean}>`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${(props)=>props.theme.textColor};
  border-radius:  15px;
  border: solid 2px ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  a {
    display: flex;
    flex-basis: 190px;
    align-items: center;
    padding: 10px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a{
      color:${(props)=>props.theme.accentColor}
    }
  }
  span {
    margin-left: 20px;
    margin-right: auto;
  }
  span:last-child {
    margin: 15px;
    font-weight: 600;
    color: ${(props) => props.isPositive ? "#4cd137" : "#e84118"}
  }
`;

const Title = styled.h1`
  font-family: 'Open Sans', sans-serif;
  letter-spacing: -3px;
  line-height: 90%;
  font-size: 40px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.textColor};
`;

const Loader = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin: 15px;
`;

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD:{
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

function Coins() {
  const { isLoading, data } = useQuery<IPriceData[]>("allCoins", fetchTikers)

/* const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async() => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0,100));
      setLoading(false);
      })();
  }, []); */
  return (
  <Container>
    <Helmet>
      <title>
        TOP100
      </title>
    </Helmet>
    <Header>
      <Title>TOP100</Title>
    </Header>
      {isLoading ? <Loader>Loading...</Loader> : (<CoinsList>
        {data?.slice(0, 100).map((coin) => (
          <Coin key={coin.id} isPositive={coin.quotes.USD.percent_change_24h > 0}>
            <Link to={`/${coin.id}/price`} state={{name:coin.name}}>
              <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
              <div>{coin.name}</div>
            </Link>
            <span>$ {coin.quotes.USD.price.toFixed(3)}</span>
            <span>{coin.quotes.USD.percent_change_24h}%</span>
          </Coin>
        ))}
      </CoinsList>)}
  </Container>
  );
}
export default Coins;