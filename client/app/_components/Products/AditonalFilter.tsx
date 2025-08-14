function AditonalFilter() {
  return (
    <div>
      <h3 className="font-medium mb-3">Additional Filters</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span>In Stock</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span>On Discount</span>
        </label>
      </div>
    </div>
  );
}

export default AditonalFilter;
