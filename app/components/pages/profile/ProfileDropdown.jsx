"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { performLogout } from "@/services/auth.service";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";

export function ProfileDropdown() {
  const name = "Sumon";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full bg-light h-12.5 p-2 text-dark hover:bg-white"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage
              className={" object-cover"}
              src="/main-logo.png"
              alt={name}
            />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <span className="text-sm font-medium">{name}</span>

          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44 rounded-md p-1">
        {/* Dashboard */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4 text-cyan-500" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4 text-cyan-500" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem className="flex gap-2 text-red-500 focus:text-red-500">
          <button onClick={performLogout} className=" flex w-full items-center gap-1" >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
