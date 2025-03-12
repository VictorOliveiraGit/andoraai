
import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const FormField = ({ id, label, icon, children }: FormFieldProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <div className="col-span-3 flex items-center gap-2">
        {icon}
        {children}
      </div>
    </div>
  );
};
