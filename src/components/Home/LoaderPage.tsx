import { Loader2 } from "lucide-react";
import React from "react";

const LoaderPage = () => {
  return (
    <main className="flex w-full min-h-screen items-center justify-center max-w-7xl mx-auto">
      <Loader2 className="size-48 animate-spin text-primary" />
    </main>
  );
};

export default LoaderPage;
