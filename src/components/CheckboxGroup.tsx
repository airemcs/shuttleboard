import Checkbox from "@/components/Checkbox";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  required?: boolean;
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
}

export default function CheckboxGroup({ 
  label, 
  required = false, 
  options, 
  values, 
  onChange 
}: CheckboxGroupProps) {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...values, value]);
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="font-sf-medium text-primary-black text-base">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </span>

      <div className="flex flex-col gap-y-3 p-4 bg-white border border-[#E1E5EA] rounded-md">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            id={option.value}
            label={option.label}
            checked={values.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
          />
        ))}
      </div>
    </div>
  );
}