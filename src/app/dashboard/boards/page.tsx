"use client";
import { BoardCard } from "@/components/board-card";
import CreateBoardForm from "@/components/CreateBoard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Board {
  _id: string;
  spaceUrlKey: string;
  spaceName: string;
  submissions: { length: number };
}

export default function BoardsPage() {
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
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Boards</h1>
        <CreateBoardForm />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Boards</TabsTrigger>
          <TabsTrigger value="recent">Recently Active</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.length > 0 ? (
              boards.map((item, index) => {
                return (
                  <BoardCard
                    key={index}
                    boardUrlKey={item.spaceUrlKey}
                    title={item.spaceName}
                    testimonialCount={item.submissions.length}
                    // lastActive="2h ago"
                  />
                );
              })
            ) : (
              <p>Get started by creating a board !</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
