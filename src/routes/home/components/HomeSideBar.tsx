import { Home, LogInIcon, PaintbrushVertical, Search } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
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
import { Separator } from "@/components/ui/separator"
import type { UserResource } from "@clerk/types"

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

interface HomeSideBarProps {
    user: UserResource | null |undefined
}

const HomeSideBar = ({ user }: HomeSideBarProps) => {
    const { setTheme } = useTheme()

    return (
        <Sidebar className="w-56">
            <SidebarHeader className=" h-16">
                <a href="/home" className=" inline-flex p-2 items-center text-xl font-medium">Image Gen</a>
            </SidebarHeader>
            <Separator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className=" w-full">
                                    <SidebarMenuButton asChild className="text-sm w-full min-h-[38px]">
                                        <a href={item.url} className="w-full h-full py-2">
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
            <Separator />
            <SidebarFooter className="">
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

                {
                    user
                        ?
                        (
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "!h-[36px] !w-[36px] shadow z-0",
                                    },
                                }}
                                showName
                            />
                        )
                        :
                        (
                            <Button variant={"ghost"} className="inline-flex justify-start py-2" asChild>
                                <a href="/sign-in"><LogInIcon/> Login</a>
                            </Button>
                        )
                }
            </SidebarFooter>
        </Sidebar>
    )
}

export default HomeSideBar;