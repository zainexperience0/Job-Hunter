"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { allModels, prePath } from "@/lib/schemas";
import Link from "next/link";
import useInfiniteQuery from "@/lib/hooks/useQuery";
import { ArrowRight, Loader, Pencil, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FilterTools } from "../FilterTools";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const JobApplicants = ({ modelSlug, jobId }: any) => {
  const [searchQuery, setSearchQuery] = useState(
    `&eq=true&fields=jobId&jobId=${jobId}`
  );

  const { data, isLoading, isFailed, isEnd } = useInfiniteQuery({
    modelSlug,
    searchQuery,
  });

  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<any>({});

  useEffect(() => {
    setModel(allModels.find((model) => model.model === modelSlug));
    setLoading(false);
  }, [modelSlug]);

  if (!model) {
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
    <div className="mt-10 max-w-5xl mx-auto px-2 space-y-10 pb-20">
      <Separator />

      <div className="flex flex-row justify-between items-center m">
        {model?.name && (
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center space-x-4">
              <p className="text-xl  font-normal capitalize">
                {model.name}({data?.length})
              </p>
            </div>
          </div>
        )}
        <FilterTools model={model} setSearchQuery={setSearchQuery} />
      </div>

      <div className="my-10 space-y-4">
        {data?.map((item: any) => (
          <Fragment key={item.id}>
            <Card key={item.id} className="border-none">
              <CardContent className="p-0 flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={item?.user?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-muted-foreground text-sm">
                  {item?.user?.email}
                </p>
                <Badge
                  variant={
                    item?.status === "NOT_APPROVED" ? "destructive" : "default"
                  }
                  className={cn(
                    `${item?.status === "APPROVED" ? "bg-green-400" : ""}`
                  )}
                >
                  {item?.status}
                </Badge>
                <Link href={`/${prePath}/${modelSlug}/view/${item.id}`}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>

              <CardHeader className="p-0 ">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-muted-foreground text-xs">
                    Created: {isoToDate(item?.createdAt)}
                  </p>
                  {item?.createdAt !== item?.updatedAt && (
                    <p className="text-muted-foreground text-xs">
                      Edited: {timeAgo(item?.updatedAt)}
                    </p>
                  )}

                  <>
                    <div className="flex flex-row items-center justify-end space-x-2">
                      <Link
                        href={`/${prePath}/${modelSlug}/edit/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "h-8 w-8 p-0"
                        )}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/${prePath}/${modelSlug}/delete/${item.id}?deletekey=content`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "h-8 w-8 p-0"
                        )}
                      >
                        <Trash className="h-4 w-4" />
                      </Link>
                    </div>
                  </>
                </div>
              </CardHeader>
            </Card>
            <Separator />
          </Fragment>
        ))}
      </div>
      <div className="mb-10">
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="h-6 w-6 text-zinc-500 animate-spin" />
          </div>
        )}
        {isEnd && <p className="text-zinc-500 text-center">All caught up!</p>}
      </div>
    </div>
  );
};
