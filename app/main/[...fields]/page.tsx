"use client";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { ListJobs } from "@/components/models/jobs/List";
import { ViewJob } from "@/components/models/jobs/View";
import { CreateUser } from "@/components/models/user/Create";
import { ListUsers } from "@/components/models/user/ListUsers";
import { Login } from "@/components/models/user/Login";
import { ViewField } from "@/components/models/viewField";
import { allModels, loginSchema } from "@/lib/schemas";

// export function generateMetadata({ params }: any): any {
//   const dynamicParamaters = params.fields;
//   const model = dynamicParamaters[0];
//   return {
//     title: model.toUpperCase(),
//   };
// }

const DynamicPage = ({ params, searchParams }: any) => {
    
  const dynamicParamaters = params.fields;
  // console.log({dynamicParamaters});
  const model = dynamicParamaters[0];
  const action = dynamicParamaters[1];
  const fieldId = dynamicParamaters[2];

  const deletefieldKey = searchParams?.deletekey;

  if (fieldId && !["edit", "delete"].includes(action)) {
   return (
    <div>
       {action === "view" && model === "job" ? (
          <ViewJob modelSlug={model} id={fieldId} />
        ) : (
          <ViewField modelSlug={model} id={fieldId} />
        )}
    </div>
   )
  } else if (action) {
    return (
      <div>
        {action === "create" && model !== "user" && <CreateField model={allModels.find((m) => m.model === model)} page={true} />}
        {action === "create" && model === "user" && <CreateUser model={allModels.find((m) => m.model === model)} page={true} />}
        {action === "login" && <Login model={loginSchema.find((m) => m.model === model)} page={true} />}
        {action === "edit" && <EditField model={allModels.find((m) => m.model === model)} id={fieldId} />}
        {action === "delete" && (
          <DeleteField modelSlug={model} id={fieldId} field={deletefieldKey} />
        )}
      </div>
    );
  } else if (model) {
    return (
      <div>
        {model === "job" && <ListJobs modelSlug={model} />}
        {model === "user" && <ListUsers modelSlug={model} />}
      </div>
    );
  }
};

export default DynamicPage;