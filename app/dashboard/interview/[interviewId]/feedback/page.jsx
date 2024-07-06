"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  // this is for storing the GetFeedback response to state
  const [feedbackList, setFeedbackList] = useState([]);

  // router for routing to the paths or locations
  const router = useRouter();

  // whenever this component get load then run the function
  useEffect(() => {
    GetFeedback();
  }, []);

  // get all the user answer and info from database
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      // user ans mockid should equal to params interviewId
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    // console.log(result)

    // stored result to feedback state
    setFeedbackList(result);
  };

  return (
    <div className="p-10">
      {/* if feedback is empty then show no feedback found */}
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500 text-center mb-5 mt-5">
          No Interview Feedback Record Found!
        </h2>
      ) : (
        // otherwise if feedback is present then show feedbacks
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>

          <h2 className="font-bold text-2xl">
            Here is Your Interview Feedback
          </h2>

          {/* need improvment from hardcoded data to dynamic data representation */}

          {/* <h2 className="text-primary text-lg my-3">
            Your Overall Interview Rating: <strong>7/10</strong>{" "}
          </h2> */}

          <h2 className="text-sm text-gray-500">
            Find Below Interview Question with correct answer, Your answer and
            feedback for improvment.
          </h2>

          {/* iterate the feedbacklist */}
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary flex justify-between rounded-lg my-2 text-left gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    {/* for rating */}
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>

                    {/* for user answer */}
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.UserAns}
                    </h2>

                    {/* for corrected answer from ai */}
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>

                    {/* feedback or imporment from ai to user */}
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      {/* redirect to home page  or dashboard button  */}
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
