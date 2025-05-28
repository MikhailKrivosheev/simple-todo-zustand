import Select from "react-select";
import useTodoStore from "../store/useTodoStore";

type FilterOption = {
  value: "active" | "completed" | "all";
  label: string;
};

const OPTIONS: FilterOption[] = [
  { value: "active", label: "Завершенные" },
  { value: "completed", label: "Активные" },
  { value: "all", label: "Все" },
];

const Filter = () => {
  const filter = useTodoStore.getState().filter;
  const addFilter = useTodoStore((state) => state.addFilter);

  return (
    <Select
      defaultValue={filter}
      onChange={(newValue) => newValue && addFilter(newValue)}
      options={OPTIONS}
    />
  );
};

export default Filter;
