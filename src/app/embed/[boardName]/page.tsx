// app/embed/[boardName]/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Submission {
  name: string;
  email: string;
  description: string;
}

export default function EmbedCarousel({
  params,
}: {
  params: { boardName: string };
}) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`/api/submission/${params.boardName}`);
        setSubmissions(res.data.submissions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubmissions();
  }, [params.boardName]);

  if (submissions.length === 0) {
    return <p>No testimonials available.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-w-xs"
      >
        <CarouselPrevious />
        <CarouselContent>
          {submissions.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardHeader>
                    <CardTitle>user name: {item.name}</CardTitle>
                    <CardDescription>user email: {item.email}</CardDescription>
                  </CardHeader>
                  <CardContent>user message: {item.description}</CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
