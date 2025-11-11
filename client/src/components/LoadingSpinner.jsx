const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="flex space-x-2">
        <span className="sr-only">Sedang membuat...</span>

        <style>
          {`
            @keyframes ai-bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .ai-dot {
              animation: ai-bounce 1s infinite ease-in-out;
            }
          `}
        </style>
        <div
          className="h-3 w-3 bg-blue-600 rounded-full ai-dot"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="h-3 w-3 bg-blue-600 rounded-full ai-dot"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="h-3 w-3 bg-blue-600 rounded-full ai-dot"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
