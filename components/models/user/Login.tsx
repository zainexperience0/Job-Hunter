"use client";
import { prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, CheckCircle, Loader } from "lucide-react";
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
import Image from "next/image";
import { PasswordInputField } from "@/components/custom/FieldList/PasswordInput";
import { EmailInputField } from "@/components/custom/FieldList/EmailInputField";
import { useLocalStorage } from 'usehooks-ts'
export const Login = ({ model, callbackFn, relation, page }: any) => {
  const [userId, setUserId, removeUserId] = useLocalStorage('id', '')
  const [data, setData] = useState({ ...relation });
  const [login, setLogin] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRelational, setIsRelational] = useState(false);

  const handleLogin = () => {
    const requiredFields = model.fields?.filter((field: any) => field.required);

    if (requiredFields?.length > 0) {
      const isEmptyRecord = requiredFields.find(
        (field: any) =>
          data[field.slug] === undefined || data[field.slug] === ""
      );
      if (isEmptyRecord) {
        alert(`Please fill all required fields. 
            ${JSON.stringify(
              requiredFields?.map((field: any) => field.name)
            )}`);
        return;
      }
    }
    setLogin(true);
    axios
      .post(`/api/login`, data)
      .then((resp: any) => {
        setLogin(false);
        setCreateSuccess(true);
        setUserId(resp.data.id)
        setTimeout(() => {
          resetFields();
            if (!callbackFn) {
              window.location.href = `/${prePath}/job`;
            } else {
              callbackFn();
            }
        }, 2000);
      })
      .catch((err: any) => {
        console.log(err);
        setLogin(false);
        setCreateFail(true);
      });
  };

  const resetFields = () => {
    setLogin(false);
    setCreateSuccess(false);
    setCreateFail(false);
    setData({ ...relation });
  };

  useEffect(() => {
    if (!relation) {
      setLoading(false);
      return;
    }
    const schemaRelationalFields = model.fields
      ?.filter((field: any) => field?.type === "relation")
      ?.map((field: any) => field?.slug);
    const propRelationalFields = Object.keys(relation);
    const isRelationalField = schemaRelationalFields?.some(
      (field: any) => !propRelationalFields?.includes(field)
    );
    setIsRelational(!!isRelationalField);
    setLoading(false);
  }, []);

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (isRelational) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center space-y-4">
        <p className="text-destructive text-2xl font-semibold">
          Relational records cannot be created manually!
        </p>
        <Link
          href={`/${prePath}/${model.model}`}
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Go back
        </Link>
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
    <div className="container mx-auto p-4">
      {page && (
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${prePath}/${model.model}`}>
                {model.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create {model.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-10">
        <div className="md:w-1/2 flex flex-col justify-center border p-6 rounded-md shadow-md">
          <EmailInputField
            field={model.fields[0]}
            record={data}
            setRecord={setData}
          />
          <PasswordInputField
            field={model.fields[1]}
            record={data}
            setRecord={setData}
          />
          <Button
            onClick={handleLogin}
            disabled={login || createSuccess || createFail}
            className="mt-6"
          >
            {login && <Loader className="h-4 w-4 mr-2 animate-spin" />}
            {login && "login..."}
            {!login && !createSuccess && !createFail && "Submit"}
            {createSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
            {createSuccess && `${model.name} created!`}
            {createFail && "Failed to create!"}
          </Button>
        </div>
        <div className="">
          <Image
            src="/hero.webp"
            alt={model.name}
            width={"1080"}
            height={"1920"}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
