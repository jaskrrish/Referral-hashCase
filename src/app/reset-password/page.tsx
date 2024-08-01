"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
  token: string;
  password: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    token: "",
    password: "",
  });
  const [confPass, setConfPass] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  const handleSubmit = async () => {
    if (user.password !== confPass) {
      toast.error("Password and Confirm Password should be same");
      console.log(user);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/user/reset-password", user);
      console.log("Password successfully changed ", response.data);
      toast.success("Password successfully changed");
      router.push("/login");
    } catch (error: any) {
      console.log("Reset Password Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Verify Code</CardTitle>
            <CardDescription>
              Enter Your Email in which you have Registered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Verify Code</Label>
                  <InputOTP
                    maxLength={6}
                    value={user.token}
                    onChange={(value) => setUser({ ...user, token: value })}
                    required
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Password</Label>
                  <Input
                    id="name"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Confirm Password</Label>
                  <Input
                    id="name"
                    type="password"
                    value={confPass}
                    onChange={(e) => setConfPass(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>

      <BackgroundBeams />
    </div>
  );
}
