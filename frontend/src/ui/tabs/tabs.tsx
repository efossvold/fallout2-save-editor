import { Button } from "@headlessui/react";
import { clsx } from "clsx";
import type { PropsWithChildren } from "react";

import * as E from "../editors";
import { Hoverable } from "../hoverable";

import { useTabsStore } from "./store";

const TabButton = (p: PropsWithChildren<{ index: number }>) => {
  const store = useTabsStore();
  const onClick = () => store.setIndex(p.index);

  return (
    <Hoverable>
      {({ isHovered }) => (
        <Button
          className={clsx(
            isHovered || p.index === store.index ? "text-gray-50" : "text-beige-500",
            "mb-2 cursor-pointer",
          )}
          onClick={onClick}
        >
          {p.children}
        </Button>
      )}
    </Hoverable>
  );
};

export const Tabs = () => {
  const tabIndex = useTabsStore((s) => s.index);

  return (
    <>
      <div className="flex flex-row justify-between w-full">
        <TabButton index={0}>TRAITS</TabButton>
        <TabButton index={1}>REPUTATION</TabButton>
        <TabButton index={2}>KILLS</TabButton>
      </div>
      <div className="max-h-none sm:max-h-42 overflow-y-auto styled-scrollbar">
        {tabIndex === 0 && <E.TraitsEditor />}
        {tabIndex === 1 && <E.GVAREditor />}
        {tabIndex === 2 && <E.KillsEditor />}
      </div>
    </>
  );
};
