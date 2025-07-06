import { Outlet, useLocation } from "react-router";
import HomeSideBar from "./components/HomeSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { capitalize } from "@/lib/utils";

const HomeLayout = () => {
    const { pathname } = useLocation()
    const segments = pathname.split("/").filter(Boolean)
    const pageName = capitalize(segments[segments.length - 1])

    return (
        <SidebarProvider className="h-screen">
            <HomeSideBar />
            <main className="w-full h-screen flex flex-col box-border">
                <div className="flex h-16 shrink-0 items-center gap-2 ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4 h-7">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className=" min-h-full" />
                        <h1 className=" font-semibold text-base text-foreground ml-2">{pageName}</h1>
                    </div>
                </div>

                <Outlet />
            </main>
        </SidebarProvider>
    );
}

export default HomeLayout;