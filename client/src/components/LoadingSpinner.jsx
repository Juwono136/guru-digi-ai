const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="flex space-x-2">
        <span className="sr-only">Sedang membuat...</span>
        {/*
          Tailwind 'animate-pulse' adalah efek shimmer.
          Untuk efek 'bounce' 3 titik, kita perlu keyframe kustom.
          Mari kita gunakan 'animate-pulse' untuk kesederhanaan.
          Untuk versi "AI" (bouncing dots):
        */}
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
