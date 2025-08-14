
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-burgundy rounded-lg shadow-lg p-8">
          

          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
