import { Loader2 } from "lucide-react";
import React from "react";

const LoaderPage = () => {
  return (
    <main className="flex-1 w-full min-h-screen items-center justify-center">
      <Loader2 className="size-48 animate-spin text-muted-foreground" />
    </main>
  );
};

export default LoaderPage;
