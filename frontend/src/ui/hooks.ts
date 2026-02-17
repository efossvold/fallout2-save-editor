import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";

import type { UseDisclosureReturn } from "../types/types";

type GetColor = (
  isHovered: boolean,
  notHoveredColor: string | (() => string),
  hoveredColor?: string,
) => string;

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>();

  useEffect(() => {
    setLocation(globalThis.window.location);
  }, [setLocation]);

  return location;
};

/** Returns
 * undefined when location is not yet available,
 * true when app is viewed in browser
 * false when is local app
 */
export const useIsWeb = (): boolean | undefined => {
  const location = useLocation();

  if (location === undefined) {
    return undefined;
  }

  return !location.href.startsWith("wails://");
};

const getColor: GetColor = (isHovered, notHoveredColor, hoveredColor) => {
  if (isHovered) {
    const defaultColor = clsx("text-gray-50");
    return hoveredColor ?? defaultColor;
  }
  if (typeof notHoveredColor === "function") {
    return notHoveredColor();
  }
  return notHoveredColor;
};

export const useHoverColor = () => getColor;

export interface Disclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useDisclose = (initState?: boolean): Disclosure => {
  const [isOpen, setIsOpen] = useState(initState ?? false);

  const onOpen = (): void => {
    setIsOpen(true);
  };

  const onClose = (): void => {
    setIsOpen(false);
  };

  const onToggle = (): void => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export const useHover = <ElementType extends HTMLElement>(): [
  React.RefObject<ElementType | null>,
  boolean,
] => {
  const [value, setValue] = useState(false);
  const ref = useRef<ElementType>(null);

  const handlePointerOver = (): void => setValue(true);
  const handlePointerOut = (): void => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("pointerenter", handlePointerOver);
      node.addEventListener("pointerleave", handlePointerOut);
      return () => {
        node.removeEventListener("pointerenter", handlePointerOver);
        node.removeEventListener("pointerleave", handlePointerOut);
      };
    }
  }, []);

  return [ref, value];
};

export const useDisclosure = (): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, onToggle };
};
