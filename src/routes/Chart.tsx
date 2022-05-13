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
      type="candlestick"
      series={[
        {
          data: data?.map((price) => {
            return{
              x: price.time_open,
              y: [price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)]
            }
          })
        },
      ]as any} 
      options={{
        theme: {
          mode: isDark ? "dark" : "light" 
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#4cd137",
              downward: "#e84118"
            }
          }
        },
        chart: {
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
      }}
    />
  )}
    </div>
  );
}

export default Chart;