"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { boardName: string } }) {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`/api/submission/${params.boardName}`);
        console.log(res.data);
        setSubmissions(res.data.submissions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubmissions();
  }, []);

  if (submissions.length === 0) {
    return <p>No testimonials available.</p>;
  }
  
  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Board: {params.boardName}
      </h2>
      <div className="m-2 flex flex-row items-center gap-x-1">
        {submissions.map((item, index) => {
          return (
            <Card>
              <CardHeader>
                <CardTitle>user name: {item.name}</CardTitle>
                <CardDescription>user email: {item.email}</CardDescription>
              </CardHeader>
              <CardContent>user message: {item.description}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
