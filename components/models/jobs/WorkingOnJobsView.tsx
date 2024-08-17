"use client";
import { allModels, prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import axios from "axios";
import { MarkdownViewer } from "@/components/customView/markdown";
import { ArrowLeft, Info, Loader, Pencil, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReadLocalStorage } from "usehooks-ts";
import { JobStart } from "./JobStart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { JobApplicants } from "./JobApplicants";

export const ViewWorkingOnJob = ({ modelSlug, id }: any) => {
  const userId = useReadLocalStorage("id");
  const [userRole, setUserRole] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [model, setModel] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setModel(allModels.find((model: any) => model.model === modelSlug));
    fetchData();
  }, []);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`/api/v1/dynamic/user/${userId}?act=getMeta`)
        .then((resp: any) => {
          setUserRole(resp.data);
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [userId]);

  const fetchData = () => {
    axios
      .get(`/api/v1/dynamic/${modelSlug}/${id}`)
      .then((resp: any) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };
  

  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p className="text-destructive text-2xl font-semibold">
          Failed to get data!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  }

  if (!data?.id) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Info className="h-8 w-8 text-muted-foreground" />
          <p className="text-2xl text-muted-foreground">
            This page doesn&apos;t exist!
          </p>
        </div>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "mt-4")}
          href={`/${prePath}/${modelSlug}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${modelSlug}`}>
              {model.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <p className="text-xl text-muted-foreground">
          {isoToDate(data?.createdAt)}
        </p>
        {userRole.role === "ADMIN" && (
          <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-x-2 sm:space-y-0">
            <Link
              href={`/${prePath}/${modelSlug}/edit/${data.id}`}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" })
              )}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Update
            </Link>
            <Link
              href={`/${prePath}/${modelSlug}/delete/${data.id}`}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" })
              )}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Link>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-5xl font-semibold">{data.title}</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center mt-2">
          <Avatar>
            <AvatarImage src={data?.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">{data?.user.username}</p>
        </div>
      </div>
      <Separator className="h-1 w-full my-4" />
      <div className="flex flex-col sm:flex-row justify-between mb-10">
        <div className="flex flex-wrap space-x-3">
          <Badge className="bg-blue-400">
            {data?.status}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground whitespace-nowrap mt-2 sm:mt-0">
          Updated {timeAgo(data?.updatedAt)}
        </p>
      </div>
      <div>
        <div className="">
          <Card>
            <CardContent className="flex justify-between">
              <div>
                <MarkdownViewer content={data?.delievery} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div></div>
      </div>
    </div>
  );
};
