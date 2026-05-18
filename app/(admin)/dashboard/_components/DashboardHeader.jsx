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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import { logoutAdmin } from "@/services/admin/admin.auth.service";
import { Moon, Search, Sun, User } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user } = useAuthContext();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events, posts, team..."
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              {user?.image && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    AD
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="hidden flex-col items-start text-left md:flex">
                {user?.role?.title && (
                  <span className="text-sm font-medium">
                    {user?.role?.title}
                  </span>
                )}

                {user?.email && (
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className=" flex items-center w-full" href={"/profile"}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logoutAdmin}
              className="text-destructive"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
