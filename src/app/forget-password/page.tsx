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
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface User {
  email: string;
}

export default function EmailSubmit() {
  const [user, setUser] = useState<User>({
    email: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/forget-password", user);
      console.log("Forget Password Code sent successfully ", response.data);
      toast.success("Forget-password successfully");
      router.push("/reset-password");
    } catch (error: any) {
      console.log("Forget password token generation failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    router.push("/login");
  };
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Forget Password</CardTitle>
            <CardDescription>
              Enter Your Email in which you have Registered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>

      <BackgroundBeams />
    </div>
  );
}
