"use client";

import { ViewJob } from "@/components/models/jobs/View";
import { Submit } from "@/components/models/jobs/Submit";
import { ViewWorkingOnJob } from "@/components/models/jobs/WorkingOnJobsView";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { CreateUser } from "@/components/models/user/Create";
import { ListJobs } from "@/components/models/jobs/List";
import { ListUsers } from "@/components/models/user/ListUsers";
import { Login } from "@/components/models/user/Login";
import { allModels, loginSchema, WorkingJobsSchema } from "@/lib/schemas";
import { WorkingOnJobEdit } from "@/components/models/jobs/WorkingOnJobViewEdit";
import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";

const DynamicPage = ({ params, searchParams }: any) => {
  const router = useRouter();
  const userId = useReadLocalStorage("id");
  if (!userId) {
    router.push("/");
  }
  const dynamicParamaters = params.fields;
  const model = dynamicParamaters[0];
  const action = dynamicParamaters[1];
  const fieldId = dynamicParamaters[2];

  const deletefieldKey = searchParams?.deletekey;

  if (model === "workingOnJobs") {
    if (action === "submit") {
      return (
        <Submit model={allModels.find((m) => m.model === model)} id={fieldId} />
      );
    }
    if (action === "view" && fieldId) {
      return <ViewWorkingOnJob modelSlug={model} id={fieldId} />;
    }
    if (action === "edit" && fieldId) {
      return (
        <WorkingOnJobEdit
          model={WorkingJobsSchema.find((m) => m.model === model)}
          id={fieldId}
        />
      );
    }
    return null; // Return null if no valid action is provided for workingOnJobs
  }

  if (fieldId && !["edit", "delete"].includes(action)) {
    if (action === "view" && model === "job") {
      return <ViewJob modelSlug={model} id={fieldId} />;
    }
  } else if (action) {
    switch (action) {
      case "create":
        return model === "user" ? (
          <CreateUser
            model={allModels.find((m) => m.model === model)}
            page={true}
          />
        ) : (
          <CreateField
            model={allModels.find((m) => m.model === model)}
            page={true}
          />
        );
      case "login":
        return (
          <Login
            model={loginSchema.find((m) => m.model === model)}
            page={true}
          />
        );
      case "edit":
        return (
          <EditField
            model={allModels.find((m) => m.model === model)}
            id={fieldId}
          />
        );
      case "delete":
        return (
          <DeleteField modelSlug={model} id={fieldId} field={deletefieldKey} />
        );
      default:
        return null;
    }
  } else if (model) {
    switch (model) {
      case "job":
        return <ListJobs modelSlug={model} />;
      case "user":
        return <ListUsers modelSlug={model} />;
      default:
        return null;
    }
  }

  return null; // Fallback return in case none of the conditions match
};

export default DynamicPage;
