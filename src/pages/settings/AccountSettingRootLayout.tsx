import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { ChevronDown, Shield, User } from "lucide-react";
import SEOHead from "@/components/MetaTagsHead/SEOHead";
import { Icons } from "@/components/Icons";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { useGetUserInfoQuery } from "@/features/hooks/profile.queries";
import { UserRole } from "@/types/enum";

// Semantic color configuration based on roles
const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  [UserRole.ADMIN]:
    "bg-amber-200 text-amber-700 border-amber-200 dark:bg-amber-500 dark:text-amber-100 dark:border-amber-500",
  [UserRole.AUTHOR]:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  [UserRole.USER]:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
};

const accountSettings = [
  {
    id: "profiles",
    icon: User,
    label: "Edit Profile",
    href: "/account-setting/edit-profile",
  },
  {
    id: "password-security",
    icon: Shield,
    label: "Password and security",
    href: "/account-setting/password-security",
  },
];

const AccountSettingRootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetUserInfoQuery();
  const role = data?.userInfo?.role;
  const capitalizeFirstLetter = role
    ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
    : "";

  return (
    <>
      <SEOHead title="Account Settings" />
      <div className="container mx-auto overflow-hidden px-4 md:px-0 lg:w-4/5">
        <div className="my-5 rounded-xl border-2 border-gray-200 px-5 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar / Mobile Collapsible Container */}
            <div className="w-full border-b border-gray-200 py-4 lg:w-78 lg:border-r lg:border-b-0 lg:py-8 lg:pr-4 dark:border-gray-800">
              {/* 1. Mobile & Tablet View (lg:hidden) */}
              <div className="md:w-2/4 lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="group bg-muted/40 flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2.5 text-left text-sm font-medium transition-all duration-300 ease-out active:scale-[0.99] dark:border-gray-800"
                >
                  <div className="flex items-center gap-2.5 text-base">
                    <Icons.gear
                      className={cn(
                        "text-muted-foreground group-hover:text-foreground h-4 w-4 transition-transform duration-500 ease-in-out",
                        isOpen ? "text-foreground rotate-180" : "rotate-0"
                      )}
                    />
                    <div className="flex items-center gap-2">
                      Account Settings
                      {role && (
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${
                            ROLE_BADGE_STYLES[role as UserRole] ??
                            "bg-muted text-muted-foreground"
                          }`}
                        >
                          {capitalizeFirstLetter}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <ChevronDown
                    className={cn(
                      "text-muted-foreground h-4 w-4 transition-transform duration-300 ease-in-out",
                      isOpen ? "text-foreground rotate-180" : "rotate-0"
                    )}
                  />
                </button>

                {/* Mobile Collapsible Nav */}
                <nav
                  className={cn(
                    "space-y-1.5 overflow-hidden transition-all duration-300 ease-out",
                    isOpen
                      ? "animate-in fade-in-50 slide-in-from-top-1 mt-2 max-h-60 opacity-100"
                      : "pointer-events-none max-h-0 opacity-0"
                  )}
                >
                  {accountSettings.map((item) => (
                    <NavLink
                      to={item.href}
                      key={item.id}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md px-4 py-2.5 text-left text-xs transition-all duration-200 ${
                          isActive
                            ? "bg-accent text-accent-foreground font-medium shadow-xs"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* 2. Desktop View Sidebar (lg:block) */}
              <div className="hidden lg:block">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  Account settings
                  {role && (
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${
                        ROLE_BADGE_STYLES[role as UserRole] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {capitalizeFirstLetter}
                    </Badge>
                  )}
                </h2>
                <nav className="space-y-2">
                  {accountSettings.map((item) => (
                    <NavLink
                      to={item.href}
                      key={item.id}
                      className={({ isActive }) =>
                        `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>

            {/* Sub-pages Render Outlet */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettingRootLayout;
