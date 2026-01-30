import pg from "pg"
import { db } from "@/utils/dbConnection"
import { revalidatePath } from "next/cache"
import bioStyles from "@/styles/bio.module.css"
import { auth } from "@clerk/nextjs/server"

export default async function UserBio(){

    const {userId} = await auth()

    if (!userId){
        return <p>Not signed in</p>
    }

    // db queries to GET data from the table - get data from birdwatchers table and render into user's info
    const result = await db.query(
        `SELECT * FROM birdwatchers WHERE user_id= $1`, [userId])

        const userBio = result.rows[0]

        if(!userBio) {
            return <p>No profile found</p>
        }
    
    return(
        <>
        <h1>User Bio</h1>
        <p>{userBio.username}</p>
        <p>Favourite bird: {userBio.fav_bird}</p>
        <p>Lives in: {userBio.home_location}</p>
        <p>{userBio.bio}</p>
        <img 
            src={userBio.profile_photo} 
            alt={`Profile photo of ${userBio.username}`}/>
        </>
    )
}

// GET data from db (userID, form data) and get username from clerk using currentUser() to render them on the profile page
// const {username} = currentUser() - to extract username from clerk