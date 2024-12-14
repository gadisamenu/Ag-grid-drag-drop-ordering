"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useWeb3Status = () => {
  const { address: walletAddress, isConnecting, isDisconnected } = useAccount();
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  useEffect(() => {
    setConnected(!isDisconnected && !isConnecting);
    setConnecting(isConnecting);
    setAddress(walletAddress);
  }, [isDisconnected, isConnecting, walletAddress]);
  return { address, connecting, connected };
};

export default useWeb3Status;
