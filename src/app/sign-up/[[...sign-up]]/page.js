// TODO: render a sign-up page

// - clerk component
// - a form to collect other user data (bio, nickname, location, interests)
// Insert users data into users table so we can render it into the profile page
// can also redirect user to the form after signup instead of on the same page

// re-style this page via Clerk
import { auth } from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import {SignUp} from "@clerk/nextjs"

export default function SignUpPage(){
    const {userId} = auth()

    if(userId){
        redirect("/create-profile")
    }
    return(
        <>
        <SignUp/>
        </>
    )
}

// Source: https://clerk.com/docs/nextjs/guides/development/custom-sign-up-page