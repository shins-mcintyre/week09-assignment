import pg from "pg"
import { db } from "@/utils/dbConnection"
import { revalidatePath } from "next/cache"
import bioStyles from "@/styles/bio.module.css"
import { auth } from "@clerk/nextjs/server"

export default async function UserBio({username}){

    const {userId} = await auth()

    if (!userId){
        return <p>Not signed in</p>
    }

    // db queries to GET data from the table - get data from birdwatchers table and render into user's info
    // this way shows own bio on all pages
    // const result = await db.query(
    //     `SELECT * FROM birdwatchers WHERE user_id= $1`, [userId])

    // try update bio based on whose profile you are on
    const result = await db.query(
        `SELECT * FROM birdwatchers WHERE username= $1`, [username])

        const userBio = result.rows[0]

        if(!userBio) {
            return <p>No profile found</p>
        }
    
    return(
        <>
        <section className={bioStyles.container}>
            <img 
                src={userBio.profile_photo} 
                alt={`Profile photo of ${userBio.username}`}
                className={bioStyles.image}/>
            <div className={bioStyles.info}>
                <p className={bioStyles.username}>{userBio.username}</p>
                <p className={bioStyles.p}>Favourite bird: {userBio.fav_bird}</p>
                <p className={bioStyles.p}>Lives in: {userBio.home_location}</p>
                <p className={bioStyles.p}>{userBio.bio}</p>
            </div>
        </section>
        </>
    )
}

// GET data from db (userID, form data) and get username from clerk using currentUser() to render them on the profile page
// const {username} = currentUser() - to extract username from clerk