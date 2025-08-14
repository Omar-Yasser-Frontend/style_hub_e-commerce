type FormInputProps = {
  id: string;
  register: object;
  type?: string;
  label: string;
  error: string | undefined;
  maxlength?: number;
};

function FormInput({
  id,
  register,
  type = "text",
  label,
  error,
  maxlength = 100,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-black-txt mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        {...register}
        maxLength={maxlength}
        required
        className="w-full px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent focus:shadow-md focus:shadow-burgundy"
        placeholder="Enter your email"
      />
      {error && (
        <p className="font-semibold text-red-600 text-sm select-none">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;
