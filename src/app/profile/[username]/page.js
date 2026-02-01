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
import profileStyles from "@/styles/profile.module.css"
import Link from "next/link"
import Header from "@/components/Header"
import { currentUser } from "@clerk/nextjs/server"
import ErrorPage from "./error"



export default async function ProfilePage({params}){

    console.log("PARAMS:", params)

    // const {username} = params
    const {userId} = await auth()
    const user = await currentUser()
    const {username} = await params

    // currently this only shows my own posts and profile, not those belonging to the actual username in the link
    // const posts = (
    //     await db.query(
    //         `SELECT * FROM bird_posts WHERE birdwatcher_id=$1 ORDER BY date DESC`,
    //         [userId]
    //     )
    // ).rows

    // get profile owner from db
    const owner=await db.query(
        `SELECT * FROM birdwatchers WHERE username=$1`, [username]
    )

    if (owner.rows.length === 0){
        return ErrorPage()
    }

    const profileOwner = owner.rows[0]

    // get posts for that profile owner
    const posts = (await db.query(
        `SELECT * FROM bird_posts WHERE birdwatcher_id=$1
        ORDER BY date DESC`, [profileOwner.user_id]
    )).rows

    // check if own profile
    const isOwnProfile = userId === profileOwner.user_id

    // throw new Error(
    //     "There is an error finding this bird nerd's profile"
    // )

    return(
        <>
        <section className={profileStyles.page}>
            <div className={profileStyles.bio}>
                <UserBio username={username}/>
            </div>

            <div className={profileStyles.postsHeader}>
                <h2>
                    {isOwnProfile
                    ? "My posts" : `${profileOwner.username}'s posts`}
                </h2>

                {isOwnProfile && (
                    <Link href="/posts/new-post" className={profileStyles.addButton}>
                     +
                    </Link>
                )}

            </div>
        
            <Timeline posts={posts} showActions={isOwnProfile} />
            {/* <p>My Posts component:</p>
            <MyPosts/> */}
        </section>
        </>
    )
}




