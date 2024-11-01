"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  SidebarTrigger,
} from "../ui";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { HomeIcon } from "lucide-react";

export const TemplatePageDashboard = () => {
  return (
    <div className="w-full">
      <div className="h-12 border-b border-zinc-400 bg-gray-700 text-white flex items-center w-full gap-5">
        <div>
          <SidebarTrigger size="icon" className="scale-105 ml-2" />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="hover:text-yellow-200 flex gap-1">
                  <HomeIcon size={20} /> Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-700 hover:bg-gray-500">
                Item One
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <div className="h-56 w-80 p-4">
                    <h1 className="font-bold">title example</h1>
                    <p className="h-72 overflow-scroll">
                      Aenean massa. Maecenas egestas arcu quis ligula mattis
                      placerat. Ut leo. Vestibulum ante ipsum primis in faucibus
                      orci luctus et ultrices posuere cubilia Curae; Sed
                      aliquam, nisi quis porttitor congue, elit erat euismod
                      orci, ac placerat dolor lectus quis orci. Vestibulum
                      facilisis, purus nec pulvinar iaculis, ligula mi congue
                      nunc, vitae euismod ligula urna in dolor. In consectetuer
                      turpis ut velit. Proin sapien ipsum, porta a, auctor quis,
                      euismod ut, mi. Maecenas tempus, tellus eget condimentum
                      rhoncus, sem quam semper libero, sit amet adipiscing sem
                      neque sed ipsum. In auctor lobortis lacus. Etiam
                      sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum
                      laoreet sapien, quis venenatis ante odio sit amet eros.
                      Curabitur a felis in nunc fringilla tristique. Sed a
                      libero.
                    </p>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Menubar className="bg-gray-700 border-none">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>File DOS</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="px-2 my-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-2 border border-zinc-300 p-3">
        <h1 className="text-2xl">Welcome to app</h1>
      </div>
    </div>
  );
};
