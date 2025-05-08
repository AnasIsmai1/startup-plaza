import { auth, signIn, signOut } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgePlus, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {
    const session = await auth()

    return (
        <header className="bg-white px-5 py-3 font-work-sans text-black">
            <nav className="flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="Logo" width={144} height={30} />
                </Link>
                <div className="flex space-x-4 items-center">
                    {session && session?.user ? (

                        <>

                            <Link href="/startup/create">
                                <span className="hidden md:block"> Create </span>
                                <BadgePlus className="size-6 -translate-y-[10%] md:hidden" />
                            </Link>


                            <form action={async () => {
                                "use server";
                                await signOut()
                            }}>
                                <button type="submit">
                                    <span className="hidden md:block">Log Out</span>
                                    <LogOut className="size-6 text-primary md:hidden" />
                                </button>
                            </form>


                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={session?.user?.image || ""}
                                        alt={session?.user?.name || ""}
                                    />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>

                        </>
                    ) : (

                        <form action={async () => {
                            "use server";

                            await signIn('github')
                        }}>
                            <button type="submit">
                                Login
                            </button>
                        </form>

                    )
                    }
                </div>
            </nav >
        </header >
    )
}

export default Navbar
