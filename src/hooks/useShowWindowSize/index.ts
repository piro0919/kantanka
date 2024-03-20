import { useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

export default function useShowWindowSize(): void {
  const [block, setBlock] = useState<HTMLDivElement>();
  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const block = document.body.appendChild(document.createElement("div"));

    block.style.background = "#fff";
    block.style.fontSize = "10px";
    block.style.padding = "2px 4px";
    block.style.position = "fixed";
    block.style.right = "0px";
    block.style.top = "0px";
    block.style.writingMode = "horizontal-tb";

    setBlock(block);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth;

    setWindowSize({ height, width });
  }, []);

  useEventListener("resize", () => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth;

    setWindowSize({ height, width });
  });

  useEffect(() => {
    if (!block || process.env.NODE_ENV !== "development") {
      return;
    }

    const { height, width } = windowSize;

    block.innerHTML = `${width}px × ${height}px`;
  }, [block, windowSize]);
}
