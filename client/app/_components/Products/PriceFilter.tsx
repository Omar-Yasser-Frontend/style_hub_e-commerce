import DoubleFaceSlider from "./DoubleFaceSlider";

function PriceFilter() {
  return (
    <div>
      <h3 className="font-medium mb-3">Price Range</h3>
      <div className="text-sm text-gray-500 relative">
        <DoubleFaceSlider />
      </div>
    </div>
  );
}

export default PriceFilter;
