"use client";
import { Briefcase, Home, Loader, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Navbar = () => {
  const userId = useReadLocalStorage<string>("id");
  const [value, setValue, removeValue] = useLocalStorage("id", userId);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`/api/v1/dynamic/user/${userId}?act=getMeta`)
        .then((resp: any) => {
          setUser(resp.data);
          setLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [userId]);

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

  if (user && user.role === "ADMIN") {
    routes.push({
      name: "Users",
      path: "/main/user",
      icon: Users,
      active: pathname === "/main/user",
    });
  }

  return (
    <div className="border-2 rounded-full p-4 flex items-center justify-evenly bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
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
        <>
          {user ? (
            <>
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={user.image} alt="Avatar image" />
                    <AvatarFallback>
                      <span className="sr-only">Loading...</span>
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm font-semibold">{user.username}</p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {user.email}
                  </p>
                  <Button
                    variant={"destructive"}
                    className="mt-4"
                    onClick={() => removeValue()}
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Button variant={"default"}>
                <Link href="/main/user/create">
                  <span className="">Sign Up</span>
                </Link>
              </Button>
              <Button variant={"default"}>
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Link href="/main/user/login">Login</Link>
                )}
              </Button>
            </>
          )}
        </>
        <ModeToggle />
      </div>
    </div>
  );
};
