import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string | undefined;
}

function Chart({coinId}:ChartProps)  {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId), {refetchInterval: 10000});
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>{isLoading ? (
      "Loading chart..." 
      ) : ( 
    <ApexChart 
      type="line"
      series={[
        {
          name: "price",
          data: data?.map((price) => price.close) as number[],
        },
      ]} 
      options={{
        theme: {
          mode: isDark ? "dark" :"light" 
        },
        chart: {
          height: 500,
          width: 500,
          toolbar: {show:false},
          background: "transparent",
        },
        stroke: {
          width: 3,
        },
       yaxis: {
         labels: {
          formatter: function(val) {
            return `$ ${val.toFixed()}`;
           }
         }
        },
        xaxis: {
          type: "datetime",
          categories: data?.map((price) => price.time_close),
        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors:["#C9FFBF"],
            stops: [0, 90]
          }
        },
        colors: ["#FFAFBD"],
        tooltip: {

        }
      }}
    />
  )}
    </div>
  );
}

export default Chart;