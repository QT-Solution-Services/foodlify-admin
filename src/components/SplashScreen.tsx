import Image from "next/image";

export default function SplashScreen() {
  return (
    <div className="splashloader-container">
      <Image
        src="/logo.svg"
        alt="logo"
        width={100}
        height={100}
        className="mx-auto"
      />
      <div className="splashloader"></div>

      <p>Loading Foodlify Admin...</p>
    </div>
  );
}
