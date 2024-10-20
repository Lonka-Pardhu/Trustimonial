"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CreateSpaceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [spaceDailogOpen, setSpaceDailogOpen] = useState(false);
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
        setSpaceDailogOpen(false);
        reset();
        toast.success("Space has been created");
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response) {
        setError(error.response.data.message || "Failed to create space");
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

  return (
    <>
      <Dialog open={spaceDailogOpen} onOpenChange={setSpaceDailogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create space +</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create your space</DialogTitle>
          </DialogHeader>
          <p className="text-red-500">{error}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-form">
            <div className="flex flex-col gap-y-1">
              <div>
                <Label htmlFor="spaceName">Space Name</Label>
                <Input
                  id="spaceName"
                  {...register("spaceName", { required: true })}
                  placeholder="Enter space name"
                />
                {errors.spaceName && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div>
                <Label htmlFor="title">Space Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="Enter space title"
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
    </>
  );
};

export default CreateSpaceForm;
