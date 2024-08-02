"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TotalReferral() {
  const storedResponse = JSON.parse(
    localStorage.getItem("responseData") || "{}"
  );

  const [tableData, setTableData] = useState([]);

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
        if (response.data.referredto !== "No referrals yet") {
          setTableData(response.data.referredto);
        }
      } catch (error: any) {
        console.log("Referral failed", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen bg-neutral-950 relative flex items-center justify-center">
      <div>
        {tableData.length ? (
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
        ) : (
          <div className="text-white text-xl font-bold">No referrals yet</div>
        )}
      </div>
    </div>
  );
}
