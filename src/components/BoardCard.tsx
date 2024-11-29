"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";
import CreateSpaceForm from "./CreateBoard";

interface Board {
  _id: string;
  spaceUrlKey: string;
  spaceName: string;
  submissions: { length: number }; // Or define the structure of submissions more specifically
}

const BoardCard = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get(`/api/space`);
        if (res?.status === 200) {
          setBoards(res.data.boards);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBoards();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete("/api/space", {
        data: { boardId: id },
      });
      if (response?.status === 200) {
        toast.success("Board has been deleted");
      }
      setBoards((prevBoards) => prevBoards.filter((board) => board._id !== id));
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete board");
    }
  };

  return (
    <div className="m-2 flex flex-row items-center gap-x-2 flex-wrap gap-y-2 ">
      {boards.length > 0 ? (
        boards.map((item, index) => {
          return (
            <Card>
              <CardHeader>
                <CardTitle>{item.spaceUrlKey}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <p>{item.spaceName}</p>
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <p>{item.submissions.length} Testimonials</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last active: 5m ago
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    key={index}
                    href={`/dashboard/boards/${item.spaceUrlKey}`}
                  >
                    <Button variant="outline">View Board</Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="hover:bg-red-500"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p>Get started by creating a board !</p>
      )}
      <CreateSpaceForm />
    </div>
  );
};

export default BoardCard;
