import React from "react";
import { Entypo } from "@expo/vector-icons";

type ChevronRightProps = {
  color: string;
  size: number;
};

export const ChevronRight = ({ color, size }: ChevronRightProps) => (
  <Entypo name="chevron-right" size={size} color={color} />
);
