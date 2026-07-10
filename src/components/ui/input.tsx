import { cn } from "@/lib/utils";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-11 px-3 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-black",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
