// this is for displaying all the user's interview
import { Button } from "@/components/ui/button";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  return (
    <div className="border shadow-sm rounded-lg p-3">
      {/* for job position */}
      <h2 className="text-primary font-bold">{interview?.jobPosition}</h2>
      
      {/* for job Experience */}
      <h2 className="text-sm text-gray-700">
        {interview.jobExperience} Years of Expereince
      </h2>

      {/* for Date of interview  */}
      <h2 className="text-xs text-gray-500">
        Created At: {interview.CreatedAt}
      </h2>
      {/* button div's */}
      <div className="flex justify-between mt-2 gap-5">
        
        <Button size="sm" variant="outline" className="w-full">
          Feedback
        </Button>

        <Button size="sm" className="w-full">
          Start
        </Button>

      </div>
    </div>
  );
};

export default InterviewItemCard;