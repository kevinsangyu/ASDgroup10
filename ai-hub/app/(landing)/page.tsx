"use client";
import React from "react";
// Next.js component for client-side navigation
import Link from "next/link";
// Custom button component
import { Button } from "@/components/ui/button";

// Home component that serves as the landing page
export default function Home() {
  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to AI Hub 👋</h1>
        <p>Explore the power of AI</p>
        <div className="buttons">
          {/* Navigation link to Sign-in page */}
          <Link href="/sign-in">
            <Button className="action-button">Login</Button>
          </Link>
          {/* Navigation link to Sign-up page */}
          <Link href="/sign-up">
            <Button className="action-button">Register</Button>
          </Link>
        </div>
      </div>

      {/* Inline styling for the components */}
      <style jsx>{`
        .landing-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
          font-family: 'Arial', sans-serif;
        }

        .content {
          text-align: center;
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: bold;
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

        .action-button:hover {
          transform: scale(1.05);
          transition: transform 0.2s;
        }
      `}</style>
    </div>
  )
};