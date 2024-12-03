"use client";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Board {
  _id: string;
  spaceName: string;
  title: string;
  message: string;
  spaceUrlKey: string;
  questions: string[];
}

const SpaceFormPage = ({ params }: { params: { spaceKey: string } }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [space, setSpace] = useState<Board | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await axios.get(`/api/${params.spaceKey}`);
        console.log(res.data.space[0]);
        setSpace(res.data.space[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpace();
  }, []);

  const onSubmit = async (data: any) => {
    console.log("rating from form data:", data.rating);
    setLoading(true);
    setError("");
    try {
      const formData = {
        ...data,
        spaceId: space?._id,
      };
      const res = await axios.post(
        `/api/submission/${params.spaceKey}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        console.log(res);
        reset();
        toast.success("Thank you so much for your valuable review");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message || "Failed to submit");
      } else {
        setError("Network error or server unreachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-2 flex h-screen items-center justify-center">
      {space && (
        <Card className="w-[425px]">
          <CardHeader>
            <CardTitle>{space.spaceName}</CardTitle>
            <CardDescription>{space.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
            <h3>{space.message}</h3>
            <ul>
              {space.questions.map((question, index) => (
                <li key={index} className=" rounded-lg p-1">
                  {question}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter your name"
              />
              {errors.name && (
                <small className="text-red-500">This field is required</small>
              )}
            </div>
            <div>
              <Label htmlFor="email">Your email</Label>
              <Input
                id="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <small className="text-red-500">This field is required</small>
              )}
            </div>
            <div>
              <Label htmlFor="description">Your review message</Label>
              <Textarea
                id="description"
                {...register("description", { required: true })}
                placeholder="Enter your description"
              />
              {errors.description && (
                <small className="text-red-500">This field is required</small>
              )}
            </div>
            <div>
              <Label htmlFor="rating">Your Rating</Label>
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <StarRating
                    value={field.value} // Passing the rating from react-hook-form
                    onChange={(value) => field.onChange(value)} // Updating the form state
                  />
                )}
              />
              {errors.rating && (
                <small className="text-red-500">rating is required</small>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              type="submit"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
export default SpaceFormPage;
