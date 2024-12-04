import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface BoardCardProps {
  boardUrlKey: string;
  title: string;
  testimonialCount: number;
  lastActive?: string;
}

export function BoardCard({
  boardUrlKey,
  title,
  testimonialCount,
  lastActive,
}: BoardCardProps) {
  return (
    <Card>
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button
            variant="ghost"
            className="hover:bg-red-500"
            // onClick={() => {
            //   handleDelete(item._id);
            // }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>
          <p className="text-muted-foreground">{`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/${boardUrlKey}`}</p>
        </CardDescription>
        <div className="flex justify-between mt-4">
          <div className=" text-sm text-muted-foreground">
            <p>Testimonials: {testimonialCount}</p>
            <p>Last active: {lastActive}</p>
          </div>
          <Link href={`/dashboard/boards/${boardUrlKey}`}>
            <Button variant="outline">View Board</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
