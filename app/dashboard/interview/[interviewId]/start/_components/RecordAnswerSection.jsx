"use client";

import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

const RecordAnswerSection = () => {
  // when ever results state is changed we need to store it in state
  const [userAnswer, setUserAnswer] = useState("");

  // install react-hook-speech-to-text and imported this for speech to text purpose
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
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
        variant="outline"
        className="my-10"
        // condition if recording is true then on click stop recording else start recording
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
};

export default RecordAnswerSection;
