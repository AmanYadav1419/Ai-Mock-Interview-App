"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {

    // state for question and answer
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    // for active question 
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    // console.log(params.InterviewId);
    GetInterviewDetails()
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
    const jsonMockResp =  JSON.parse(result[0].jsonMockResp)
    // console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp)
    setInterviewData(result[0]);

  };

  return <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions section component */}
        <QuestionSection activeQuestionIndex={activeQuestionIndex} mockInterviewQuestion={mockInterviewQuestion} />


        {/* video / audio recording */}
        <RecordAnswerSection />
    </div>
  </div>;
};

export default StartInterview;
