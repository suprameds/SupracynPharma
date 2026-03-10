"use client";

import Link from "next/link";
import { mainNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-sm bg-primary" />
            <span className="font-bold text-xl tracking-tight text-primary">Supracyn Pharma</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavigation.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent">{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink 
                                render={<Link href={child.href} />}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{child.label}</div>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink 
                      render={<Link href={item.href} />}
                      className={`${navigationMenuTriggerStyle()} bg-transparent`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Call to Action & Mobile Nav */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Link href="/partnerships">
              <Button variant="default">Partner Inquiry</Button>
            </Link>
          </div>
          
          <Sheet>
            <SheetTrigger className="md:hidden p-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {mainNavigation.map((item) => (
                  <div key={item.label} className="flex flex-col space-y-3">
                    <Link href={item.href} className="text-lg font-semibold text-foreground/80 hover:text-primary">
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-4 flex flex-col space-y-2">
                        {item.children.map((child) => (
                          <Link key={child.label} href={child.href} className="text-sm text-muted-foreground hover:text-primary">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6 border-t pt-6">
                  <Link href="/partnerships" className="w-full">
                    <Button variant="default" className="w-full">Partner Inquiry</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
