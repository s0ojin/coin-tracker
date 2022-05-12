import {BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins"
import Coin from "./routes/Coin"
import Header from "./components/Header";
interface IRouterProps {

}

function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Header  />
      <Routes>
        <Route path="/:coinId/*" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router;