function ErrorMessage({ message }: { message: string }) {
  return (
    <div>
      <p className="text-red-500 font-semibold text-xl">Error: {message}</p>
    </div>
  );
}

export default ErrorMessage;
