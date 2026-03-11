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
import { Menu, Stethoscope } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
              <Stethoscope className="h-6 w-6" />
            </div>
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
                        <ul className="grid w-[420px] gap-1.5 p-3 md:grid-cols-1 lg:w-[480px]">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink
                                render={<Link href={child.href} />}
                                className="group flex select-none gap-3 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/5 focus:bg-primary/5"
                              >
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900 leading-none mb-1">{child.label}</div>
                                  {child.description && (
                                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">{child.description}</p>
                                  )}
                                </div>
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
