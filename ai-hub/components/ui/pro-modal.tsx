"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Badge } from "./badge";
import { MessageSquare, Code, Video, Music, Image, Check, Zap } from "lucide-react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Image Generation",
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Video Generation",
    icon: Video,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

export const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounder-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {tool.label}
                  </div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white"/>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
