"use client";
import { BoardCard } from "@/components/board-card";
import CreateBoardForm from "@/components/CreateBoard";
import { Button } from "@/components/ui/button";
import { CardStack } from "@/components/ui/card-stack";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Board {
  _id: string;
  spaceUrlKey: string;
  spaceName: string;
  logoImage: string;
  submissions: { length: number };
}

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/space`);
        if (res?.status === 200) {
          setBoards(res.data.boards);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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

  const handleAddBoard = (newBoard: Board) => {
    setBoards((prevBoards) => [newBoard, ...prevBoards]);
  };

  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Boards</h1>
        <CreateBoardForm onBoardCreated={handleAddBoard} />
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Boards</TabsTrigger>
          <TabsTrigger value="recent">Recently Active</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-36" />
              ))}
            </div>
          )}
          {!isLoading && boards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boards.map((item, index) => {
                return (
                  <BoardCard
                    key={index}
                    boardUrlKey={item.spaceUrlKey}
                    title={item.spaceName}
                    logoImage={item.logoImage}
                    testimonialCount={item.submissions.length}
                    onDelete={() => handleDelete(item._id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center w-full mt-[20%] flex-col flex gap-y-3 items-center justify-center">
              {" "}
              <p>You don't have any boards yet. Create one to get started.</p>
              <CreateBoardForm onBoardCreated={handleAddBoard} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
