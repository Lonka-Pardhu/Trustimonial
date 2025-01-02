"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Grid, MessageSquare, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import StarRating from "@/components/StarRating";

interface Testimonial {
  _id: string;
  name: string;
  email: string;
  description: string;
  rating: number;
  createdAt: string;
  spaceId: string;
  spaceUrlKey: string;
}

const Overview = () => {
  const session = useSession();
  const [recentTestimonials, setRecentTestimonials] = useState<Testimonial[]>(
    []
  );

  if (!session) {
    return redirect("/");
  }

  useEffect(() => {
    const fetchRecentTestimonials = async () => {
      try {
        const response = await axios.get("/api/submission");
        if (response.status === 200) {
          setRecentTestimonials(response.data.testimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchRecentTestimonials();
  }, []);

  const data = [
    { name: "Jan", testimonials: 4 },
    { name: "Feb", testimonials: 3 },
    { name: "Mar", testimonials: 2 },
    { name: "Apr", testimonials: 7 },
    { name: "May", testimonials: 5 },
    { name: "Jun", testimonials: 8 },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Testimonials
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Boards</CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              2 new boards this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Testimonial Trend Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Testimonial Trend</CardTitle>
          <CardDescription>
            Number of testimonials collected over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>here comes the Chart</p>
        </CardContent>
      </Card>

      {/* Recent Testimonials */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Testimonials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentTestimonials.map((testimonial) => (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage
                        src="/placeholder-user-1.jpg"
                        alt={testimonial.name}
                      />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-medium">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarRating value={testimonial.rating} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{testimonial.description}</p>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Board: {testimonial.spaceUrlKey}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              <li className="flex items-center py-4 px-6">
                <Avatar className="mr-4">
                  <AvatarImage src="/placeholder-user-3.jpg" alt="Lisa R." />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    Lisa R. generated a new embed for "Customer Service"
                  </p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </li>
              <li className="flex items-center py-4 px-6">
                <Avatar className="mr-4">
                  <AvatarImage src="/placeholder-user-4.jpg" alt="Tom K." />
                  <AvatarFallback>TK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    Tom K. created a new board "Product Launch Feedback"
                  </p>
                  <p className="text-sm text-gray-500">3 days ago</p>
                </div>
              </li>
              <li className="flex items-center py-4 px-6">
                <Avatar className="mr-4">
                  <AvatarImage src="/placeholder-user-5.jpg" alt="Emma S." />
                  <AvatarFallback>ES</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    Emma S. pinned a testimonial on "Website Redesign" board
                  </p>
                  <p className="text-sm text-gray-500">4 days ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
