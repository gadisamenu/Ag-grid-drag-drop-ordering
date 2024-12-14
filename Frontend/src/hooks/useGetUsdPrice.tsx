import { useEffect, useState } from "react";
import { parseEther, formatEther } from "viem";

const useGetUsdPrice = (ethPrice?: string) => {
  const [usdPrice, setUsdPrice] = useState("0");
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Fetch the latest Ether to USD conversion rate
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
        );
        const data = await response.json();

        const ethToUsdRate = data.ethereum.usd;

        // Convert the Ether price to USD
        const priceInWei = parseEther(ethPrice as string);
        const priceInEth = formatEther(priceInWei);
        const priceInUSD = parseFloat(priceInEth) * ethToUsdRate;

        setUsdPrice(priceInUSD.toFixed(2));
      } catch (error) {
        console.log("error", error);
      }
    };

    ethPrice && fetchPrice();
  }, [ethPrice]);

  return usdPrice;
};

export default useGetUsdPrice;
