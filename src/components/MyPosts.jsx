// TODO: render list of all posts and who posted them

import { db } from "@/utils/dbConnection"
import birdPostStyles from "@/styles/birdPost.module.css"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs/server"


export default async function MyPosts({searchParams}){

    const {userId} = await auth()
    const user = await currentUser()

    const birdposts = (await db.query(`SELECT * FROM bird_posts WHERE birdwatcher_id=$1`, [userId])).rows
    console.log(birdposts)

    async function handleDeletePost(formData){
        "use server"
        const postId = formData.get("postId")
        await db.query(
            `DELETE FROM bird_posts WHERE id=$1`, [postId]
        )
        revalidatePath(`/profile/${user?.username}`)
    }

    if (birdposts.length === 0){
        return (
            <>
            <p className={birdPostStyles.p}>You haven't shared any sightings yet. If you want to share a sighting, create a post...</p>
            <Link href={"/posts/new-post"}>Create a post</Link>
            </>
        )}

    
//    if (searchParams.sort === "asc"){
//     birdposts.sort(
//       (a,b) => new Date(a.date) - new Date(b.date)
//     )
//     }

//     if (searchParams.sort === "desc"){
//     birdposts.sort(
//       (a,b)=> new Date(b.date) - new Date(a.date)
//     )
//     }   

    return(
        <>
        <h1>My sightings</h1>
        
        <div className={birdPostStyles.sortControls}>
            <Link href="/hike-menu?sort=asc">Sort oldest to newest</Link> - <Link href="/hike-menu?sort=desc">Sort newest to oldest</Link>
        </div>

        {birdposts.map((post)=>{

            
            const formattedDate = new Date(birdposts.date).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
            });

            return(
            <div key={post.id} className={birdPostStyles.birdPost}>
                <img
                    src={post.img_src}
                    alt={`Photo of a ${post.bird_type}, spotted in ${post.location} by ${post.username}`}/>

            <div className={birdPostStyles.postDetails}>
                <p>
                    <strong>Type of bird: </strong> {post.bird_type}
                </p>
                <p>
                    <strong>Sighting: </strong> {post.location} on {formattedDate}
                </p>
                <p>
                    <strong>Comments: </strong> {post.comment}
                </p>
            </div>

            <form action={handleDeletePost}>
                <input type="hidden" name="postId" value={post.id}/>
                <button
                    type="submit"
                    className={birdPostStyles.deleteButton}>
                    Delete post
                </button>
                </form>
                {/* <button
                    type="submit"
                    className={birdPostStyles.editButton}
                    href={`/posts/${postId}/edit`}>
                    Edit post</button> */}
            
            </div> )   })}</>)    }        


   