"use client";
import { useContext, useState } from "react";
import { AppContext } from "@/context";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [referralCode, setReferralCode] = useState<string>("");
  const context = useContext(AppContext);
  const router = useRouter();
  // const responses = JSON.parse(localStorage.getItem("responseData") || "");

  function notify(message: string) {
    toast(message);
  }

  const handleReferral = async () => {
    try {
      const body = {
        user_id: context.user.id,
        referral_code: referralCode,
      };
      console.log(body);

      const response = await axios.post(
        "https://3346-27-4-39-6.ngrok-free.app/user/add-referral",
        body
      );
      console.log(response.data);
      notify(response.data.message);
    } catch (error: any) {
      console.log("Referral failed", error.message);
      notify(error.message);
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="my-6 flex justify-center">
        {context.user.referral ? (
          <div className="max-w-2xl mx-auto p-4 z-20">
            <div className="flex gap-x-4 my-6">
              <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Referral Program
              </h1>
              <div className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-fit px-4 py-2 rounded-md">
                Referral code : {context.user.referral}
              </div>
            </div>
            <div className="flex flex-col justify-center my-6 px-8">
              <div className="flex justify-center">
                <Input
                  id="Referral Code"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Referral Code "
                  className="px-4 py-2 w-full"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  className="my-4 px-8 py-2 w-fit"
                  variant={"outline"}
                  onClick={handleReferral}
                >
                  Use this Referral Code
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-4 z-20">
            <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              Join the <br /> Referral Program
            </h1>
            <div className="my-6 flex justify-center">
              <Link
                href="/signup"
                className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md"
              >
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
      <BackgroundBeams />
      <Toaster />
    </div>
  );
}
