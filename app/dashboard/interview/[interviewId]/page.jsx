"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const Interview = ({ params }) => {
  // state to store details from GetInterviewDetails function
  const [interviewData, setinterviewData] = useState();
  //   state for webcam state
  const [webCamEnabled, setWebCamEnabled] = useState();

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
    setinterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      {/* this div divides screen in two section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {/* job role/job position */}
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {interviewData.jobPosition}
            </h2>

            {/* job Description/Tech Stack */}
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>
              {interviewData.jobDesc}
            </h2>

            {/* job Experience */}
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>
              {interviewData.jobExperience}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>

            {/* added information like enable webcam and microphone */}
            <h2 className="mt-2 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        {/* if webcam is true show webcam if false show icon/image */}
        <div>
          {webCamEnabled ? (
            <Webcam
              //   to acess user webcamera
              onUserMedia={() => setWebCamEnabled(true)}
              // if user not accept or allow for webcam
              onUserMediaError={() => setWebCamEnabled(false)}
              /**
             webcam display's the opposite as it is like
            mirror like right hand show left hand to prevent this 
             */
              mirrored={true}
              // height and width of web cam
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />

              {/* to enabled webcam for this button */}
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      {/* div and button for start interview */}
      <div className="flex justify-end items-end">
        <Button>Start Interview</Button>
      </div>
      
    </div>
  );
};

export default Interview;
