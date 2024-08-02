"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "@/context";

interface User {
  email: string;
  phoneNumber: string;
}

export default function Signup() {
  const router = useRouter();
  const context = useContext(AppContext);
  const [user, setUser] = useState<User>({
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  function notify(message: string) {
    toast(message);
  }

  const onSignup = async () => {
    try {
      setLoading(true);
      const headers = {
        "x-api-key": "ebee0446e8c737d6",
      };

      const body = {
        owner_id: 1,
        email: user.email,
        identifier: user.phoneNumber,
      };

      const response = await axios.post(
        "https://3346-27-4-39-6.ngrok-free.app/dev/register-user",
        body,
        { headers }
      );
      console.log("Signup success", response.data);
      console.log(response.data.user.referral_code);
      localStorage.setItem("responseData", JSON.stringify(response.data));
      context.setUser({
        id: response.data.user.id,
        referral: response.data.user.referral_code,
      });
      notify(response.data.message);
      router.push("/referral");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      notify(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign-Up</CardTitle>
            <CardDescription>
              Register yourself in the Hash Case
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Email</Label>
                  <Input
                    id="name"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Phone Number</Label>
                  <Input
                    id="name"
                    type="text"
                    value={user.phoneNumber}
                    onChange={(e) =>
                      setUser({ ...user, phoneNumber: e.target.value })
                    }
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <div className="flex justify-center mb-4">
            <Button onClick={onSignup}>Signup</Button>
          </div>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
