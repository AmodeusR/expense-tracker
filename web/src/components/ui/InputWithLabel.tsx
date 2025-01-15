import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type InputWithLabelProps = {
  id: string;
  labelTitle: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
};

export function InputWithLabel({
  labelTitle,
  type,
  placeholder,
  id,
  onChange,
  value,
  onBlur,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={id}>{labelTitle}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
}
