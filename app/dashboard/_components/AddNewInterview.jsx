"use client";

// as this is client compoent as we ae using useState hook so make it client component

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  // create states to store data
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState([]);

  // router for routing to different page
  const router = useRouter();

  // user details for createdBy
  const { user } = useUser();

  // this function work only on submit
  const onSubmit = async (event) => {
    // set loading true as user click the submit button
    setLoading(true);
    // to prevent reload of page
    event.preventDefault();

    // console.log(jobPosition,jobDesc,jobExperience)

    // prompt for gemini api
    const InputPrompt =
      "Job Position : " +
      jobPosition +
      ", Job Description : " +
      jobDesc +
      ", Years of Experience :" +
      jobExperience +
      ", Depends on this information please give me " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " interview Questions with Answered in JSON format , give question and Answered as feild in JSON";

    // call to gemini api
    const result = await chatSession.sendMessage(InputPrompt);

    // for removing ```json``` from gemini ai response
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    // console.log(JSON.parse(MockJsonResponse));
    // storing all response to state
    setJsonResponse(MockJsonResponse);

    // to store response to database only if MockJsonResponse is true
    if (MockJsonResponse) {
      const resp = await db
        .insert(MockInterview)
        // store data in db
        .values({
          // unique id generated from uuid package
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          //  for date and time we use moment libaray
          createdAt: moment().format("DD-MM-yyyy"),

          // after this data get inserted it will return mockId
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID :", resp);

      // to close the dialog after response is true
      if (resp) {
        setOpenDailog(false);

        // once we have the response we need to navigate to route i.e it is dynamic route. by using mockid we can do it
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } 
    else {
      console.log("ERROR");
    }

    // once finish all process set loading false
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="font-semibold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Detail about your job position/role, Job description and
                    experinece
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Reactjs ,Nextjs SpringBoot, Java, Nodejs, Expressjs,Angular, mysql,Mongodb"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDailog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {/* for loading if true then show loading ui */}
                    {
                      <>
                        loading ? <LoaderCircle className="animate-spin" />{" "}
                        'Generating From AI' : 'Start Interview'
                      </>
                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
