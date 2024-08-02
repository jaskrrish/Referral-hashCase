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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from "@/context";
import { ArrowRight } from "lucide-react";

export default function Referral() {
  const router = useRouter();
  const context = useContext(AppContext);
  const [referralCode, setReferralCode] = useState("");
  const storedResponse = JSON.parse(
    localStorage.getItem("responseData") || "{}"
  );

  console.log(storedResponse);

  const [tableData, setTableData] = useState([]);
  console.log(tableData);
  console.log(tableData.length);

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
        "https://cbb7-110-224-92-238.ngrok-free.app/user/add-referral",
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

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        userId: storedResponse.user.id,
        identifier: storedResponse.user.identifier,
      };
      try {
        const response = await axios.post(
          `https://cbb7-110-224-92-238.ngrok-free.app/user/referrals`,
          body
        );
        console.log(response.data);
        console.log(response.data.referredto);
        if (response.data.referredto !== "No referrals yet") {
          setTableData(response.data.referredto);
        }
      } catch (error: any) {
        console.log("Referral failed", error.message);
        notify(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex gap-x-8 items-center justify-center antialiased">
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
      <div>
        {tableData.length > 1 ? (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-full text-white">Referrals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((referral, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-white w-full">
                    {referral}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{tableData.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
}
