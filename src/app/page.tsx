"use client";
import { useContext, useState } from "react";
import { AppContext } from "@/context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import HashCaseTextLogo from "../../public/hashcaselogo.png";

export default function Home() {
  const context = useContext(AppContext);
  const router = useRouter();
  const storedResponse = JSON.parse(
    localStorage.getItem("responseData") || "{}"
  );
  console.log(storedResponse);

  function notify(message: string) {
    toast(message);
  }

  function copyClipboard() {
    navigator.clipboard
      .writeText(storedResponse.user.referral_code)
      .then(() => {
        notify("Referral code copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="my-6 flex justify-center">
        {storedResponse.user ? (
          <div className="max-w-2xl mx-auto p-4 z-20">
            <div className="flex justify-center">
              <Image
                src={HashCaseTextLogo}
                alt="HashCase Text Logo"
                className="h-20 w-20"
              />
            </div>
            <div className="flex gap-x-4 my-6">
              <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Refer a friend and earn rewards
              </h1>
            </div>
            <div className="my-8 flex justify-center">
              <Button variant={"outline"} className="font-semibold text-lg">
                Referral Code :{"  "}
                <span className="font-bold mx-2">
                  {storedResponse.user.referral_code}
                </span>
                <Copy onClick={copyClipboard} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-4 z-20">
            <div className="flex justify-center">
              <Image
                src={HashCaseTextLogo}
                alt="HashCase Text Logo"
                className="h-20 w-20"
              />
            </div>
            <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Join the Hash Case <br /> Referral Program
            </h1>
            <div className="my-8 flex justify-center">
              <Link href="/signup">
                <Button variant={"outline"} className="font-semibold text-lg">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
