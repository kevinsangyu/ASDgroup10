"use client";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, Image, MessageSquare, Music, Video } from "lucide-react";
import { FaQuestionCircle } from "react-icons/fa";
import SupportConsole from "@/components/SupportConsole";
import React, { useState } from "react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/code"
  },
  {
    label: "Image Generation",
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/image"
  },
  {
    label: "Video Generation",
    icon: Video,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/video"
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/music"
  },
];

const DashboardPage = () => {
  const router = useRouter();
  // Support box
  const [isSupportConsoleOpen, setIsSupportConsoleOpen] = useState(false);

  // Support box
  const toggleSupportConsole = () => {
    setIsSupportConsoleOpen(!isSupportConsoleOpen);
  };

  return (
    <>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Welcome to AI Hub{' '}
          <span className="animate-waving-hand">👋</span>
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Play with the most comprehensive AI platform
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center
            justify-between hover:shadow-md transition
            cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                {React.createElement(tool.icon, { className: cn("w-8 h-8", tool.color) })}
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>

      {/* Floating button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={toggleSupportConsole}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          <FaQuestionCircle size={24} />
        </button>
      </div>

      {/* Support Console */}
      {isSupportConsoleOpen && <SupportConsole onClose={() => setIsSupportConsoleOpen(false)} />}

          {/* Footer with "use client" */}
          <div className="footer text-muted-foreground">
            © [Developed by ASD Group 10] [2023]
          </div>

            {/* Inline styling for the components */}
            <style jsx>{`
              .footer {
                position: absolute;
                bottom: 0;
                text-align: center;
              }
      `}</style>
    </>
  );
};

export default DashboardPage;
