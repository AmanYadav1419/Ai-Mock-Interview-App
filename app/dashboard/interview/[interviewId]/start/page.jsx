"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  // state for question and answer
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  // for active question index
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    // console.log(params.InterviewId);
    GetInterviewDetails();
  }, []);

  /**
   * Used to Get Interview details by MockId/Interview Id
   */
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.InterviewId));

    // console.log(result);

    // storing the first data to state
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    // console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions section component */}
        <QuestionSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
        />

        {/* video / audio recording */}
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {/* previous question only show if question index is greater than 1 i.e 2nd question */}
        {activeQuestionIndex > 0 && (
          <Button
            // logic for previous question working
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}

        {/* next question is not appear when last question is there */}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            // logic for next question working
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}

        {/* end interview button show when there is last question */}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          // route for feedback for particular mockid once user finish the interview then onclick o btn it will redirect to feedback route
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
