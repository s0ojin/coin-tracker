import { useQuery } from "react-query";
import { fetchCoinToday } from "./api";
import styled from "styled-components";

interface IToday {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string | undefined;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  `;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.bgColor};
  
  span:first-child {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;
  }
`;

function Price({coinId}:PriceProps) {
  const { isLoading, data } = useQuery<IToday[]>(["ohlcvToday", coinId],() => fetchCoinToday(coinId));
  return (
    <div>{isLoading ? (
      "Loading Price..."
      ) : (
        <Container>
          <Item>
            <span>open</span>
            <span>{data?.map((price) => price.open.toFixed(3))}</span>
          </Item>
          <Item>
            <span>close</span>
            <span>{data?.map((price) => price.close.toFixed(3))}</span>
          </Item>
          <Item>
            <span>high</span>
            <span>{data?.map((price) => price.high.toFixed(3))}</span>
          </Item>
          <Item>
            <span>low</span>
            <span>{data?.map((price) => price.low.toFixed(3))}</span>
          </Item>
        </Container>
      )
      }
    </div>
  )
  }
  

export default Price;