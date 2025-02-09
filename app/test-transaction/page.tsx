"use client";

import { useState, useTransition } from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => { setCount((prev) => prev + 1)})
}

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? "Updating..." : "Increase"}
      </button>
    </div>
  );
}
