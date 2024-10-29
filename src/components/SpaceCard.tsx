"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";

const SpaceCard = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await axios.get(`/api/space`);
        if (res?.status === 200) {
          setSpaces(res.data.spaces);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpaces();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api/space", {
        data: { spaceId: id },
      });
      if (response?.status === 200) {
        toast.success("Space has been deleted");
      }
      setSpaces((prevSpaces) => prevSpaces.filter((space) => space._id !== id));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete space");
    }
  };

  return (
    <div className="m-2 flex flex-row items-center gap-x-1 ">
      {spaces &&
        spaces.map((item, index) => {
          return (
            <Link key={index} href={`/boards/${item.spaceUrlKey}`}>
              <Card className="w-[200px] text-white bg-[#25282C] h-auto shadow-md broder-[#33363A] border transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                <CardHeader className="flex flex-row items-center justify-between">
                  <p>{item.spaceName}</p>
                  <Button
                    variant="ghost"
                    className="hover:bg-red-500"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <p>Submissions:</p>
                    <p>{item.submissions.length}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
    </div>
  );
};

export default SpaceCard;
