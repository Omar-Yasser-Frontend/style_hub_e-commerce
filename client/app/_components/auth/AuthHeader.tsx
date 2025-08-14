interface AuthHeaderProps {
  message: string;
}

function AuthHeader({ message }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-black-txt mb-2">Welcome</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

export default AuthHeader;
