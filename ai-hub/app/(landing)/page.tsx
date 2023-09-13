"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to AI Hub 👋</h1>
        <p>Explore the power of AI</p>
        <div className="buttons">
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Register</Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .landing-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .content {
          text-align: center;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
      `}</style>
    </div>
  )

};