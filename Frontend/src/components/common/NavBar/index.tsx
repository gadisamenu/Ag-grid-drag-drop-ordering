"use client";
import {} from "@/store/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type Props = {};

const NavBar = (props: Props) => {
  const dispatch = useAppDispatch();
  // const session = useAppSelector((state) => state.auth.session);

  return <div className="sticky z-50 w-full bg-background top-0"> Nav bar</div>;
};

export default NavBar;
