import {BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins"
import Coin from "./routes/Coin"
import Header from "./components/Header";
import Footer from "./components/Footer";


function Router() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/:coinId/*" element={<Coin />} />
          <Route path="/" element={<Coins />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}
export default Router;