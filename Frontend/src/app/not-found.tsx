import Link from "next/link";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-blue-500 pb-12">
        404 Page Not Found
      </h1>
      <p className="text-2xl">
        Sadly, the page you&apos;re looking for has been moved or decomissioned.
      </p>
      <p className="text-2xl">
        Return to{" "}
        <Link href="/" className="font-bold">
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
