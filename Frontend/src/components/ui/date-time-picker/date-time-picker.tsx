"use client";

import React, { useRef, useState } from "react";
import {
  DateValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { useForwardedRef } from "@/lib/useForwardedRef";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { TimeField } from "./time-field";

const DateTimePicker = React.forwardRef<
  HTMLDivElement,
  DatePickerStateOptions<DateValue>
>((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const state = useDatePickerState(props);
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const { buttonProps } = useButton(_buttonProps, buttonRef);
  useInteractOutside({
    ref: contentRef,
    onInteractOutside: (e) => {
      setOpen(false);
    },
  });

  return (
    <div
      {...groupProps}
      ref={ref}
      className={cn(
        groupProps.className,
        "flex items-center rounded-md ring-offset-background p-5",
      )}
    >
      <div {...dialogProps} className="space-y-3">
        {!!state.hasTime && (
          <TimeField value={state.timeValue} onChange={state.setTimeValue} />
        )}
        <Calendar {...calendarProps} />
      </div>
    </div>
  );
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
