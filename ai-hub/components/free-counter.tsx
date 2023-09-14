"use client";

import { useEffect, useState } from "react";

import { Card, CardContent} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const FreeCounter = () => {

  return (
    <div className="px-3">
      <Card className="g-white/10 border-0 bg-slate-800">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              1 / 5 Free Generations
            </p>
            <Progress
              className="h-3"
              value={(1/5) * 100}
            />
          </div>
          <Button className="w-full" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white"/>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
