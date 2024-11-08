"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItem {
  title: string;
  sublinks?: {
    icon: React.ReactNode; title: string; href: string; description: string 
}[];
}

interface NavbarProps {
  navItems: NavItem[];
}

export default function Navbar({ navItems }: NavbarProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="ml-40">
        {navItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.sublinks ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[400px]">
                    {item.sublinks.map((sublink, subIndex) => (
                      <ListItem
                        className="hover:bg-[#262626]"
                        key={subIndex}
                        title={sublink.title}
                        href={sublink.href}
                        icon={sublink.icon} // Pass the icon prop
                      >
                        {sublink.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link
                href={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-center space-x-2 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {/* Render the icon if provided */}
          {icon && <span className="w-5 h-5 text-muted-foreground">{icon}</span>}
          <div>
            <div className="text-md font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
