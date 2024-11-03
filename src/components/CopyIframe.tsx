"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";

const CopyIframe = () => {
  const [iframeCode, setIframeCode] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setIframeCode(
      `<iframe id="embedIframe" src="http://localhost:3000/embed/pinned" frameBorder="0" scrolling="no" width="100%" style="height: 400px;"></iframe>`
    );
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`/api/submission/pinned`);
        setSubmissions(res.data.submissions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubmissions();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="flex items-center justify-center">
      {submissions.length > 0 && (
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
      )}
    </div>
  );
};

export default CopyIframe;
