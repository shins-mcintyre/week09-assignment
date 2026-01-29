// TODO: render user's data

// - READ user's data from the user table
// - READ user's posts: render a list of user's personal posts (SQL query that specifies SELECTS all posts of a specific user)

// TIPS:
// - Clerk userID does not exist until the user signs up (new user's cannot see a profile page) --> show sign-up and sign-in buttons first thing. Only the homepage is public, the rest of the routes are protected

// Look at resource links Manny posted in his 
// use currentUser() to access info about current user from Clerk

import UserBio from "@/components/UserBio"


export default function ProfilePage(){


    return(
        <>
        <h1>User's Info</h1>
        <UserBio/>


        <h1>User's Posts</h1>
        {/* use .map to render all posts WHERE user_id = the logged in user */}
        </>
    )
}
