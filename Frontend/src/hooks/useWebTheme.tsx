"use client";
import { ThemeMode } from "@web3modal/core";
import { useWeb3ModalTheme } from "@web3modal/wagmi/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const useWebTheme = () => {
  const { theme, setTheme } = useTheme();
  const { setThemeMode } = useWeb3ModalTheme();
  const [mode, setMode] = useState("dark");
  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
      setThemeMode("dark");
    } else {
      setTheme("light");
      setThemeMode("light");
    }
  };
  useEffect(() => {
    setMode(theme as string);
    setThemeMode(theme as ThemeMode);
  }, [theme, setThemeMode]);
  return { mode, handleToggle };
};

export default useWebTheme;
