"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CreateBoardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isCopied, setIsCopied] = useState(false);
  const [boardDailogOpen, setBoardDailogOpen] = useState(false);
  const [linkDailogOpen, setLinkDailogOpen] = useState(false);
  const [boardLink, setBoardLink] = useState("");
  const [questions, setQuestions] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/space", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) {
        setBoardLink(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/${res.data.url}`);
        reset();
        setBoardDailogOpen(false);
        setLinkDailogOpen(true);
        toast.success("Board has been created");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message || "Failed to create board");
      } else {
        setError("Network error or server unreachable");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(boardLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <>
      <Dialog open={boardDailogOpen} onOpenChange={setBoardDailogOpen}>
        <DialogTrigger asChild>
          <Button>
            <span className="mr-2">+</span>
            Create New Board
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create your board</DialogTitle>
          </DialogHeader>
          <p className="text-red-500">{error}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-form">
            <div className="flex flex-col gap-y-1">
              <div>
                <Label htmlFor="spaceName">Board Name</Label>
                <Input
                  id="spaceName"
                  {...register("spaceName", { required: true })}
                  placeholder="Enter board name"
                />
                {errors.spaceName && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div>
                <Label htmlFor="title">Board Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="Enter board title"
                />
                {errors.title && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...register("message", { required: true })}
                  placeholder="Enter your message"
                />
                {errors.message && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div>
                <Label>Questions</Label>
                {questions.map((question, index) => (
                  <Input
                    key={index}
                    {...register(`questions[${index}]`, { required: true })} // Register the question fields
                    value={question}
                    className="mb-1"
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    placeholder={`Question ${index + 1}`}
                  />
                ))}
                {errors.questions && (
                  <small className="text-red-500">
                    Please fill all questions
                  </small>
                )}
              </div>
              <DialogFooter>
                <Button disabled={loading} type="submit">
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={linkDailogOpen} onOpenChange={setLinkDailogOpen}>
        <DialogContent className="sm:max-w-[425px">
          <DialogHeader>
            <DialogTitle>Board created successfully!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-row items-center w-full gap-x-2">
            <p className="p-2 border rounded-md w-full">{boardLink}</p>
            <Button
              variant="secondary"
              className="flex items-center gap-x-1"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4" />
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateBoardForm;
