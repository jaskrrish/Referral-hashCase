import React from "react";
import HashCaseTextLogo from "../../public/hashcaselogo.png";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="bg-black py-4">
      <div className="container  flex items-center justify-center gap-x-6 bg-black backdrop-blur-md">
        <Image
          src={HashCaseTextLogo}
          alt="HashCase Text Logo"
          className="h-16 w-16"
        />
        <p className="text-lg font-bold tracking-wide capitalize text-white">
          referral program
        </p>
      </div>
    </nav>
  );
};

export default Header;
