import React from "react";
import { useSearchParams } from "react-router-dom";
const SuccessPage = () => {
  const searchQuery = useSearchParams()[0];
  const refNum = searchQuery.get("reference");
  return (
    <div>
      <div>
        <h1>Payment Successful</h1>
        Ref Number:{refNum}
      </div>
    </div>
  );
};

export default SuccessPage;
