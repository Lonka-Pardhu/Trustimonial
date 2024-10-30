"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pin } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  _id: string;
  name: string;
  email: string;
  description: string;
  pinned: boolean;
}

export default function Page({ params }: { params: { boardName: string } }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`/api/submission/${params.boardName}`);
        setSubmissions(res.data.submissions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubmissions();
  }, []);

  const togglePin = async (submissionId: string, isPinned: boolean) => {
    try {
      const res = await axios.put(
        `/api/board/${params.boardName}/pin-submission/${submissionId}`,
        {
          pinned: !isPinned,
        }
      );
      if (res?.status === 200) {
        toast.success(res.data.message);
        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((submission) =>
            submission._id === submissionId
              ? { ...submission, pinned: !isPinned }
              : submission
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  };

  if (!submissions) {
    return (
      <div className="flex items-center justify-center w-full p-2">
        <p>Please wait..</p>
      </div>
    );
  }
  if (submissions.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-2">
        <p>No testimonials available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Board: {params.boardName}
      </h2>
      <div className="m-2 flex flex-row items-start gap-x-1">
        {submissions.map((item, index) => {
          return (
            <Card key={index}>
              <CardHeader className="w-full flex flex-row items-center justify-between">
                <div>
                  <CardTitle>user name: {item.name}</CardTitle>
                  <CardDescription>user email: {item.email}</CardDescription>
                </div>
                <Button
                  onClick={() => togglePin(item._id, item.pinned)}
                  className={`${
                    item.pinned ? "bg-black" : "bg-white"
                  } cursor-pointer `}
                >
                  <Pin
                    size={20}
                    strokeWidth={1.75}
                    color={item.pinned ? "#ffffff" : "#000000"}
                  />
                </Button>
              </CardHeader>
              <CardContent>user message: {item.description}</CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
