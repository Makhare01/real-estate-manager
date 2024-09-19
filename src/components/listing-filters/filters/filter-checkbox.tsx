import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  label: string;
  value: string;
  checked: boolean;
  onCheckChanged: (checked: boolean) => void;
};

export const FilterCheckbox = ({
  label,
  value,
  checked,
  onCheckChanged,
}: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={value}
        value={value}
        onCheckedChange={onCheckChanged}
        defaultChecked={checked}
      />
      <label
        htmlFor={value}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
