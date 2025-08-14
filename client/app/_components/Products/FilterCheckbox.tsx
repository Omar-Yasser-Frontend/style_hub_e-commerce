type FilterCheckboxProps = {
  category: string;
  toggle: (category: string) => void;
  cat: string[];
  updateParams: ({
    filter,
    value,
    single,
  }: {
    filter: string;
    value: string;
    single?: boolean;
  }) => void;
};

function FilterCheckbox({
  category,
  toggle,
  cat,
  updateParams,
}: FilterCheckboxProps) {

  return (
    <label className="flex items-center gap-2">
      <input
        onChange={(e) => {
          toggle(e.target.value.toLowerCase());
          updateParams({
            filter: "category",
            value: e.target.value.toLowerCase(),
          });
        }}
        value={category}
        checked={cat.includes(category.toLowerCase())}
        type="checkbox"
        className="rounded border-gray-300"
      />
      <span>{category}</span>
    </label>
  );
}

export default FilterCheckbox;
