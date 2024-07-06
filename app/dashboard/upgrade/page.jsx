import planData from "@/utils/planData";
import React from "react";
import PlanItemCard from "./_components/PlanItemCard";

const Upgrade = () => {
  return (
    <div className="p-10">

      {/* text for upgrade */}
      <h2 className="font-bold text-3xl text-center">Upgrade</h2>

      {/* text for second h2 upgrade to monthly plan  */}
      <h2 className="text-center text-gray-500">
        Upgrade to Monthly plan to acess unlimited mock interview
      </h2>

      {/* div for plans data fetching and showing  */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:items-center md:gap-8">
          {/* iterating all data from planData to new Component */}

          {planData.map((plan, index) => (
            <PlanItemCard plan={plan} key={index} />
          ))}
        </div>

      </div>
      
    </div>
  );
};

export default Upgrade;
