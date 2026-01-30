// TODO: render user's data

// - READ user's data from the user table
// - READ user's posts: render a list of user's personal posts (SQL query that specifies SELECTS all posts of a specific user)

// TIPS:
// - Clerk userID does not exist until the user signs up (new user's cannot see a profile page) --> show sign-up and sign-in buttons first thing. Only the homepage is public, the rest of the routes are protected

// Look at resource links Manny posted in his 
// use currentUser() to access info about current user from Clerk

import UserBio from "@/components/UserBio"
import MyPosts from "@/components/MyPosts"
import {db} from "@/utils/dbConnection"
import Timeline from "@/components/Timeline"
import { auth } from "@clerk/nextjs/server"


export default async function ProfilePage({params}){

    // const {username} = params
    const {userId} = await auth()

    const posts = (
        await db.query(
            `SELECT * FROM bird_posts WHERE birdwatcher_id=$1 ORDER BY date DESC`,
            [userId]
        )
    ).rows

    return(
        <>
        <UserBio/>

        {/* <h1>{username}'s sightings</h1> */}
        <Timeline posts={posts} showActions />
        <MyPosts/>
        </>
    )
}




