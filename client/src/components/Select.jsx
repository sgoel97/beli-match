import { useController } from "react-hook-form";
import { Select as $Select } from "@mantine/core";

export function Select({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState,
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <$Select
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      error={fieldState.error?.message}
      {...field}
      {...props}
    />
  );
}
