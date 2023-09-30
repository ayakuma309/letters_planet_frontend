import RandomPosts from "@/components/random/RandomPosts";
import React, { Suspense } from "react";

const random_page = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <RandomPosts />
      </Suspense>
    </main>
  );
};

export default random_page;
