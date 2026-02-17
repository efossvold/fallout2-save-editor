import { clsx } from "clsx";

import type { ClassName } from "../types/types";

import { useHelpTextStore } from "./help-text/store";
import { useHoverColor } from "./hooks";
import { Hoverable } from "./hoverable";
import { Checkbox as CheckboxUnchecked, CheckboxChecked } from "./icons";

interface Props {
  name: string;
  value: boolean;
  helperText: string;
  onCheck: () => void;
  onUncheck: () => void;
  className?: ClassName;
}

export const ValueCheckbox = (p: Props) => {
  const getColor = useHoverColor();
  const setHelpText = useHelpTextStore((s) => s.setHelpText);
  const CheckBox = p.value ? CheckboxChecked : CheckboxUnchecked;

  return (
    <Hoverable
      onHover={() => setHelpText(p.name, p.helperText)}
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (p.value) {
          p.onUncheck();
        } else {
          p.onCheck();
        }
      }}
    >
      {({ isHovered }) => (
        <div className="flex justify-between items-center cursor-pointer">
          <p
            className={getColor(
              isHovered,
              p.value || isHovered ? "text-green-200" : "text-green-900",
              "text-gray-50",
            )}
          >
            {p.name}
          </p>

          <CheckBox
            className={clsx(
              p.className,
              getColor(
                isHovered,
                p.value || isHovered ? "fill-green-200" : "fill-green-900",
                "fill-gold-400",
              ),
            )}
          />
        </div>
      )}
    </Hoverable>
  );
};
