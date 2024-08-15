"use client";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { ListJobs } from "@/components/models/jobs/List";
import { ViewJob } from "@/components/models/jobs/View";
import { ListModelData } from "@/components/models/listModelData";
import { CreateUser } from "@/components/models/user/Create";
import { ViewField } from "@/components/models/viewField";
import { allModels } from "@/lib/schemas";
import { useSearchParams } from "next/navigation";

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
        {model === "user" && <ListModelData modelSlug={model} />}
      </div>
    );
  }
};

export default DynamicPage;