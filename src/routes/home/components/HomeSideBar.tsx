import { Home, PaintbrushVertical, Search } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/clerk-react"
import useTheme from "@/hooks/use-theme"

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home
    },
    {
        title: "Explore",
        url: "/home/explore",
        icon: Search
    }
    ,
    {
        title: "Create",
        url: "/home/create",
        icon: PaintbrushVertical,
    }
]

const HomeSideBar = () => {
    const {setTheme} = useTheme()
    return (
        <Sidebar className="w-56">
            <SidebarContent className="pt-6 px-6">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-3">
                        <a href="/home" className="text-xl font-semibold tracking-wide">Image Gen</a>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className=" w-full">
                                    <SidebarMenuButton asChild className="text-sm font-semibold w-full rounded-full min-h-[38px]">
                                        <a href={item.url} className="w-full h-full py-2 px-4">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="px-6 pb-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className=" justify-start text-sm focus:outline-none focus:ring-0">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:hidden" />
                            <Moon className="h-[1.2rem] w-[1.2rem] hidden scale-0 rotate-90 transition-all dark:inline-block dark:scale-100 dark:rotate-0" />
                            <span className="">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "!h-[48px] !w-[48px] shadow z-0",
                        },

                    }}
                />
            </SidebarFooter>
        </Sidebar>
    )
}

export default HomeSideBar;