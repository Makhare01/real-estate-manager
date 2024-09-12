import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const ListingFilters = () => {
  return (
    <div className="border p-3 rounded-[10px]">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="რეგიონი" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="აჭარა">აჭარა</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
