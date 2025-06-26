"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/Item";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{item.title}</span>
          <Badge
            variant={item.status === "Active" ? "default" : "outline"}
            className={`capitalize ${
              item.status === "Sold" || item.status === "Rented"
                ? "bg-red-500 text-white"
                : ""
            }`}
          >
            {item.status}
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{item.location}</p>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-blue-600">{item.price} NOK</p>
      </CardContent>
    </Card>
  );
}
