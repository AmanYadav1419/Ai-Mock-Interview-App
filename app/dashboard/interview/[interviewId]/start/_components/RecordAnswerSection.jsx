"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const RecordAnswerSection = ({
  activeQuestionIndex,
  mockInterviewQuestion,
  interviewData,
}) => {
  // when ever results state is changed we need to store it in state
  const [userAnswer, setUserAnswer] = useState("");

  // to get all the details of user by clerk auth
  const { user } = useUser();

  // state for loading
  const [loading, setLoading] = useState(false);

  // install react-hook-speech-to-text and imported this for speech to text purpose
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // whenever result get changed we need to store db
  useEffect(() => {
    // in that each and every word is get mapped and stored in state
    results.map((result) =>
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript)
    );
  }, [results]);

  // if recording is stop and user answer length is greater than 10 then run updateanswer function
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  // condition to check if recording is true or not
  const StartStopRecording = async () => {
    setLoading(true);
    if (isRecording) {
      stopSpeechToText();
      // if (userAnswer?.length < 10) {
      //   setLoading(false);
      //   // toastifyed message it's like notification type message
      //   toast("Error While Saving Your Answer, Please Record Again");
      //   return;
      // }
      // set user answer blank after it successful
      // setUserAnswer("");
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    // console.log(userAnswer);

    // set loading true
    setLoading(true);

    // fetch correct question and answer from ai
    const feedbackPrompt =
      "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question;
    ", User Answer:" +
      userAnswer +
      ",Depends on question and user answer for given interview question " +
      " please give us rating for answer and feedback as area of improvment if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating feild and feedback feild";

    // this up prompt will send to ai model
    const result = await chatSession.sendMessage(feedbackPrompt);

    // for removing ```json``` from gemini ai response
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    // console.log(mockJsonResp);

    // to convert json feedback to text
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    // once the new table is get stored and the data is stored in table
    const resp = await db.insert(userAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      CorrectAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    // show toast notification when user sucessful
    if (resp) {
      toast("User Answer Recorded Sucessfully!");
      // for storing next answer it should be blank or empty
      setUserAnswer("");
      // for storing next result it should be empty after storing prev answer
      setResults([]);
    }
    setResults([]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center rounded-lg bg-black p-5">
        {/* add image name webcam.png in public folder */}
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>

      {/* button to clikc for record answer purose */}
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        // condition if recording is true then on click stop recording else start recording
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      {/* now we don't need this button */}
      {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}
    </div>
  );
};

export default RecordAnswerSection;
