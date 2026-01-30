// ALL POSTS

// TODO: render list of all posts and who posted them

import { db } from "@/utils/dbConnection"
import birdPostStyles from "@/styles/birdPost.module.css"
import Link from "next/link"
import Timeline from "@/components/Timeline"


// NEW VERSION WITH TIMELINE COMPONENT
export default async function PostsPage(){
    const posts = (
        await db.query(
            `SELECT * FROM bird_posts ORDER BY date DESC`
        )
    ).rows

    return(
        <>
        <h1>All sightings</h1>
        <Timeline posts={posts}/>
        </>
    )
}

// OLD VERSION - NOT USING TIMELINE COMPONENT
// export default async function PostsPage({searchParams}){

//     const query=await searchParams

//     const birdposts = (await db.query(`SELECT * FROM bird_posts`)).rows
//     console.log(birdposts)

//     async function handleDeletePost(formData){
//         "use server"
//         const postId = formData.get("postId")
//         await db.query(
//             `DELETE FROM bird_posts WHERE id=$1`, [postId]
//         )
//         revalidatePath(`/profile/${user?.username}`)
//     }

//     const formattedDate = new Date(birdposts.date).toLocaleDateString("en-GB", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         });

//    if (query.sort === "asc"){
//     birdposts.sort(
//       (a,b) => new Date(a.date) - new Date(b.date)
//     )
//     }

//     if (query.sort === "desc"){
//     birdposts.sort(
//       (a,b)=> new Date(b.date) - new Date(a.date)
//     )
//     }   

//     return(
//         <>
//         <h1>Posts Page</h1>
        
//         <div className={birdPostStyles.sortControls}>
//             <Link href="/hike-menu?sort=asc">Sort oldest to newest</Link> - <Link href="/hike-menu?sort=desc">Sort newest to oldest</Link>
//         </div>

//         {birdposts.map((post)=>(
//             <div key={post.id} className={birdPostStyles.birdPost}>
//                 <img
//                     src={post.img_src}
//                     alt={`Photo of a ${post.bird_type}, spotted in ${post.location} by ${post.username}`}/>

//             <div className={birdPostStyles.postDetails}>
//                 <h3>
//                     <Link href={`/profile/${post.username}`} className={birdPostStyles.userLink}>
//                     {post.username}
//                     </Link>
//                 </h3>

//                 <p>
//                     <strong>Type of bird: </strong> {post.bird_type}
//                 </p>
//                 <p>
//                     <strong>Sighting: </strong> {post.location} on {formattedDate}
//                 </p>
//                 <p>
//                     <strong>Comments: </strong> {post.comment}
//                 </p>
//             </div>

//             <form action={handleDeletePost}>
//                 <input type="hidden" name="postId" value={post.id}/>
//                 <button
//                     type="submit"
//                     className={birdPostStyles.deleteButton}>
//                     Delete post
//                 </button>
//                 </form>
//                 <button
//                     type="submit"
//                     className={birdPostStyles.editButton}
//                     href={`/posts/${postId}/edit`}>
//                     Edit post</button>
//             </div>    ))}</>)    }        



// OLD VERSION PROBS DELETE
        // {birdposts.map((birdpost) => {
        //   const formattedDate = new Date(birdpost.date).toLocaleDateString(
        //     "en-GB",
        //     {
        //       year: "numeric",
        //       month: "long",
        //       day: "numeric",
        //     }
        //   );

        //   return (
        //     <Link 
        //       key={birdpost.id} 
        //       className=""
        //       href={`/posts/${birdpost.id}`}>
        //       <img
        //         src={birdpost.img_src}
        //         alt={`Image of ${birdpost.bird_type}`}
        //       />
        //       <h3>{birdpost.username}</h3>
        //       <p>{formattedDate}</p>
        //     </Link>
        //   );
        // })
