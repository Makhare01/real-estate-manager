import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  label: string;
  value: string;
};

export const FilterCheckbox = ({ label, value }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={value} value={value} />
      <label
        htmlFor={value}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
