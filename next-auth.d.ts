declare module "next-auth" {
    interface Session {
        id: string
    }

    interface User {
        id: string
        name: string
        email: string
        image: string
        username: string
    }
}
