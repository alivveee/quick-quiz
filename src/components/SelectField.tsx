import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label?: string;                                                                           
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const SelectField = ({
  label,
  options,
  placeholder,                                                                                                
  value,
  onChange,
  className = "w-[180px]",
}: SelectFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (                             
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
