"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

const CreateSpaceForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [questions, setQuestions] = useState(["", "", ""]);

  const onSubmit = (data: any) => {
    // Process form submission
    console.log(data);
  };

  const handleQuestionChange = (index: any, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <Card className="w-[350px]">
      <CardContent className="w-full pt-2">
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
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                />
              ))}
              {errors.questions && (
                <small className="text-red-500">
                  Please fill all questions
                </small>
              )}
            </div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSpaceForm;
