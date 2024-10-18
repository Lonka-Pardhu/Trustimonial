"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-form">
      <div>
        <label htmlFor="spaceName">Space Name</label>
        <Input
          id="spaceName"
          {...register("spaceName", { required: true })}
          placeholder="Enter space name"
        />
        {errors.spaceName && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="title">Space Title</label>
        <Input
          id="title"
          {...register("title", { required: true })}
          placeholder="Enter space title"
        />
        {errors.title && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <Textarea
          id="message"
          {...register("message", { required: true })}
          placeholder="Enter your message"
        />
        {errors.message && <span>This field is required</span>}
      </div>

      <div>
        <label>Questions</label>
        {questions.map((question, index) => (
          <Input
            key={index}
            value={question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            placeholder={`Question ${index + 1}`}
          />
        ))}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateSpaceForm;
