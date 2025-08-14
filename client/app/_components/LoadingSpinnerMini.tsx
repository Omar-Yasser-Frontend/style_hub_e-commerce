function LoadingSpinnerMini({ invert = true }: { invert?: boolean }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`loader border-gray-200 ${invert ? "red-b" : "gray-b"}`}
      ></div>
    </div>
  );
}

export default LoadingSpinnerMini;
