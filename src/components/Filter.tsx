import Select from "react-select";
import useTodoStore from "../store/useTodoStore";

const OPTIONS = [
  { value: "active", label: "Завершенные" },
  { value: "completed", label: "Активные" },
  { value: "all", label: "Все" },
];

const Filter = () => {
  const filter = useTodoStore.getState().filter;
  const addFilter = useTodoStore((state) => state.addFilter);

  return (
    <Select
      defaultValue={filter.value}
      onChange={addFilter}
      options={OPTIONS}
    />
  );
};

export default Filter;
