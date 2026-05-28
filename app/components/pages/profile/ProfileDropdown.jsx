"use client";

import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth.service";
import { getGlobalData } from "@/services/global.service";
import { Building2, LayoutDashboard, LogOut, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProfileDropdown({ user }) {
  const name = user?.firstName;
  const [global, setGlobal] = useState({});

  const fetchGlobal = async () => {
    try {
      const res = await getGlobalData();
      setGlobal(res?.data?.data)
    } catch (err) {
      console.error(`FAiled to load global data`, err)
    }
  }

  useEffect(() => {
    fetchGlobal()
  }, [])



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full bg-light h-12.5 p-2 text-dark hover:bg-white"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              className={"object-cover"}
              src={user?.image || "/main-logo.png"}
              alt={name}
            />
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

      <DropdownMenuContent align="end" className="w-52 rounded-md p-1">
        {/* Dashboard */}
        {user?.role?.id === 2 && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-cyan-500" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link href="/profile/me" className="flex items-center gap-2">
            <User className="h-4 w-4 text-cyan-500" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* --- NEW ROUTES --- */}
        <DropdownMenuItem asChild>
          {
            global?.isMember ? <Link href="/profile/member" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-cyan-500" />
              Member Profile
            </Link> : <Link href="/member-register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-cyan-500" />
              Become a Member
            </Link>
          }
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          {
            global?.isOrganizer ? <Link href="/dashboard/organizer" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-cyan-500" />
             Organizer Dashboard
            </Link> : <Link href="/organizer-register" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-cyan-500" />
              Become an Organizer
            </Link>
          }

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          className="flex gap-2 text-red-500 focus:text-red-500 cursor-pointer"
          onSelect={() => logoutUser()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}