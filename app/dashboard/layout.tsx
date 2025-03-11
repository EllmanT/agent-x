
"use client"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { NavigationProvider } from "@/lib/NavigationProvider";
import { Authenticated } from "convex/react";
import { ReactNode } from "react";

export default function DashboadLayout({
    children,
}:{
    children:ReactNode;
}){
    return <NavigationProvider
    >
        <div className="flex h-screen overflow-hidden">
        <Authenticated>
       
        {/* Sideabar */}
            <Sidebar/>
        </Authenticated>
        <div className=" flex-1">
            <Header/>
            <main>
            {children}
            </main>
        </div>
        </div>
      </NavigationProvider>
}