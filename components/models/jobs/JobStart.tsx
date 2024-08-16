"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";
import { prePath } from "@/lib/schemas";
export const JobStart = ({ modelSlug, jobId }: any) => {
  const userId = useReadLocalStorage("id");

  const [jobsData, setJobsData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isFailed, setFailed] = useState(false);
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .post(`/api/v1/workingJobs`, { jobId, userId })
        .then((resp: any) => {
          setData(resp.data);
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
          setFailed(true);
          console.log(err);
          // setFailed(true);
        });
    }
  }, [jobId, modelSlug, userId]);

  const onStart = () => {
    setLoading(true);
    axios
      .post(`/api/v1/dynamic/${modelSlug}`, {
        ...jobsData,
        status: "WORKING",
        delievery: "In Work",
        job: { connect: { id: jobId } },
        user: { connect: { id: userId } },
      })
      .then((resp: any) => {
        // console.log(resp.data);
        location.reload();
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  };


  // console.log(data);
  

  if (!modelSlug) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Failed to get data!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-4 flex space-x-4">
      <Button onClick={()=> location.href=`/${prePath}/${modelSlug}/submit/${data?.id}`} disabled={data?.status !== "WORKING"}>
        Submit
      </Button>
      <Button onClick={onStart} disabled={data?.status !== "POSTED"}>
        {data?.status}
        {loading && <Loader className="mx-auto animate-spin" />}
        {isFailed && "Failed"}
      </Button>
    </div>
  );
};
