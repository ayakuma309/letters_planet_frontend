import React from "react"
import RandomPosts from "@/components/random/RandomPosts"

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12`}
    >
      <RandomPosts />
    </main>
  )
}
