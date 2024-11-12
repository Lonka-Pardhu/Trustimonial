"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";

const BoardCard = () => {
  const [boards, setBoards] = useState([]);

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

  const handleDelete = async (id) => {
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
    <div className="m-2 flex flex-row items-center gap-x-1 ">
      {boards.length > 0 ? (
        boards.map((item, index) => {
          return (
            <Card className="w-[200px] text-white bg-[#25282C] h-auto shadow-md broder-[#33363A] border transition-shadow duration-300  hover:shadow-lg hover:shadow-gray-400">
              <CardHeader className="flex flex-row items-center justify-between">
                <Link
                  key={index}
                  href={`/dashboard/boards/${item.spaceUrlKey}`}
                >
                  <p>{item.spaceName}</p>
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
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <p>Submissions:</p>
                  <p>{item.submissions.length}</p>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p>Get started by creating a board !</p>
      )}
    </div>
  );
};

export default BoardCard;
