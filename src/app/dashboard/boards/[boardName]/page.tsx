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
import EmbedCarousel from "@/components/EmbedCarousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Submission {
  _id: string;
  name: string;
  email: string;
  description: string;
  pinned: boolean;
}

export default function Page({ params }: { params: { boardName: string } }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [iframeCode, setIframeCode] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIframeCode(
      `<iframe id="embedIframe" src="http://localhost:3000/embed/${params.boardName}" frameBorder="0" scrolling="no" width="100%" style="height: 400px;"></iframe>`
    );
  }, [params.boardName]);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
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
      <h2 className=" pb-2 text-3xl font-semibold tracking-tight first:mt-0">
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
                  variant="ghost"
                  className={` ml-4 hover:bg-blue-500 ${
                    item.pinned ? "bg-blue-500" : ""
                  }`}
                  onClick={() => togglePin(item._id, item.pinned)}
                >
                  <Pin
                    size={18}
                    strokeWidth={1.7}
                    color={item.pinned ? "#ffffff" : "#000000"}
                  />
                </Button>
              </CardHeader>
              <CardContent>user message: {item.description}</CardContent>
            </Card>
          );
        })}
      </div>
      <br />
      <h3 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Embed {params.boardName} carousel :
      </h3>
      <EmbedCarousel boardName={params.boardName} />
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">Get Embed iframe</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">Embed this iframe</h3>
            <p className="text-sm mb-4">
              Copy the code below to embed this carousel on your site.
            </p>
            <div className="p-2 bg-gray-100 rounded-md text-sm break-all">
              <code>{iframeCode}</code>
            </div>
            <Button variant="secondary" className="mt-2" onClick={handleCopy}>
              {isCopied ? "Copied" : "Copy to clip board"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
