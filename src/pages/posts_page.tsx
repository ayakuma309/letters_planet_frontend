import React from "react";
import Timeline from "@/components/posts/Timeline";

const posts_page = () => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Timeline />
    </main>
  );
};

export default posts_page;
