import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BoardCardProps {
  boardUrlKey: string;
  title: string;
  testimonialCount: number;
  logoImage: string;
  lastActive?: string;
  onDelete: () => void;
}

export function BoardCard({
  boardUrlKey,
  title,
  testimonialCount,
  lastActive,
  logoImage,
  onDelete,
}: BoardCardProps) {
  return (
    <Card>
      <CardHeader className="py-4">
        <Image
          src={logoImage}
          alt="board image"
          width={300}
          height={400}
          className="w-full h-18 rounded-md"
        />

        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Button
            variant="ghost"
            className="hover:bg-red-500"
            onClick={onDelete}
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
