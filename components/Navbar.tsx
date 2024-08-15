"use client";
import { Briefcase, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {
  const pathname = usePathname();
  const routes = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      name: "Jobs",
      path: "/main/job",
      icon: Briefcase,
      active: pathname === "/main/job",
    },
  ];

  return (
    <div className="border-2 rounded-full p-4 flex items-center justify-between bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Briefcase className="w-8 h-8 text-indigo-600" />
        <h1 className="font-extrabold text-lg text-gray-800">JOB HUNTER</h1>
      </div>
      <div className="flex items-center space-x-4">
        {routes.map((route) => (
          <Link href={route.path} key={route.name}>
            <span
              className={`text-sm font-semibold ${
                route.active
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              } transition-colors duration-300`}
            >
              {route.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Button variant={"secondary"}>
          <Link href="/main/user/create">
            <span className="">
              Admin
            </span>
          </Link>
        </Button>
        <Button variant={"default"}>
          <Link href="/main/user/create">
            <span className="">
              Sign Up
            </span>
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
