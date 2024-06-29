import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface CoinAPI {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

const Coins = ({}) => {
  const [coins, setCoins] = useState<CoinAPI[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(coins);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border rounded"
          onChange={handleChange}
        />
      </div>
      <table className="table-auto w-full border-none">
        <thead>
          <tr className="border-b-2 ">
            <th className="py-2">Logo</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="py-2 text-end">Price</th>
            <th className="py-2 text-end">Volume</th>
            <th className="py-2 text-end">24h Change</th>
            <th className="py-2 text-end">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td className="py-2 ">
                <img
                  className="mx-auto"
                  src={coin.image}
                  width={50}
                  height={50}
                  alt={coin.name}
                />
              </td>
              <td className=" px-4 py-2 text-center">{coin.name}</td>
              <td className=" px-4 py-2 text-center">
                {coin.symbol.toUpperCase()}
              </td>
              <td className="py-2 text-end">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className=" py-2 text-end">
                ${coin.total_volume.toLocaleString()}
              </td>
              <td
                className={
                  coin.price_change_percentage_24h < 0
                    ? "py-2 text-end text-red-500"
                    : "py-2 text-end text-green-500"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className=" py-2 text-end">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coins;

// 81acd2d4-32da-4bcd-8271-5a6e5e029cae
