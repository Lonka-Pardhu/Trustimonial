"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import axios from "axios";

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

  return (
    <div className="m-2 flex flex-row items-center gap-x-1">
      {spaces &&
        spaces.map((item, index) => {
          return (
            <Card
              key={index}
              className="w-fit h-auto shadow-md transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
            >
              <CardHeader>
                <p>{item.spaceName}</p>
              </CardHeader>
            </Card>
          );
        })}
    </div>
  );
};

export default SpaceCard;
