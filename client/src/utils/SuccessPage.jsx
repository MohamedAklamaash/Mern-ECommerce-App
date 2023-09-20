import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const SuccessPage = () => {
  const searchQuery = useSearchParams()[0];
  const navigate = useNavigate();
  const refNum = searchQuery.get("reference");
  setTimeout(() => {
    navigate("/")
  }, 10000);
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[100vmin] text-4xl font-mono">
        <h1>Payment Successful</h1>
        Ref Number:`{refNum}`
      </div>
    </div>
  );
};

export default SuccessPage;
