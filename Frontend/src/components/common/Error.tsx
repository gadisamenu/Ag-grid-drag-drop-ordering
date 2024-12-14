import { MdErrorOutline } from "react-icons/md";
import { TypographySmall } from "./Typography";
import { Button } from "../ui/button";

type Props = {
  message?: string;
  retry?: any;
};

const Error = ({ retry, message = "Something went wrong!!!" }: Props) => {
  return (
    <div className="col-span-12 w-full h-72 flex flex-col gap-3 items-center justify-center">
      <MdErrorOutline className="text-red-500" size={60} />
      <TypographySmall text={message} />
      <Button variant={"destructive"} size={"sm"} onClick={retry}>
        Try Again
      </Button>
    </div>
  );
};

export default Error;
