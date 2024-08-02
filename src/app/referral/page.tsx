"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "@/context";
import { ArrowRight } from "lucide-react";

export default function ReferralPage() {
  const router = useRouter();
  const context = useContext(AppContext);
  const [referralCode, setReferralCode] = useState("");
  const storedResponse = JSON.parse(
    localStorage.getItem("responseData") || "{}"
  );

  function notify(message: string) {
    toast(message);
  }

  const handleReferral = async () => {
    try {
      const body = {
        user_id: storedResponse.user.id,
        referral_code: referralCode,
      };
      console.log(body);

      const response = await axios.post(
        "https://3346-27-4-39-6.ngrok-free.app/user/add-referral",
        body
      );
      console.log(response.data);
      notify(response.data.message);
      localStorage.setItem("referralResponse", JSON.stringify(response.data));
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error: any) {
      console.log("Referral failed", error.message);
      notify(error.message);
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Referral Code</CardTitle>
            <CardDescription>
              Use the referral code to claim the NFT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Referral Code</Label>
                  <Input
                    id="name"
                    type="email"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Referral Code"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <div className="flex justify-center">
            <Button onClick={handleReferral}>Use the Referral</Button>
          </div>
          <CardFooter className="flex justify-center my-3">
            <Link href="/" className="text-gray-800 flex gap-x-2">
              Want to Skip this <ArrowRight />
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
