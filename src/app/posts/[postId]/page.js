// a page to show an individual post

import pg from "pg"
import {db} from "@/utils/dbConnection"
import birdPostStyles from "@/styles/birdPost.module.css"
import Link from "next/link"
import {notFound} from "next/navigation"
import Timeline from "@/components/Timeline"
import { auth } from "@clerk/nextjs/server"

export default async function SinglePostPage({params}){

    const {userId} = await auth()

    const posts = (
        await db.query(
            `SELECT * FROM bird_posts WHERE birdwatcher_id=$1`,
            [userId]
        )
    ).rows

    if (posts.length === 0){
        notFound()
    }

    console.log("posts:", posts, Array.isArray(posts))

    return(
        <>
        <Timeline posts={posts}/>
        </>
    )
}


// OLD STUFF MAYBE DELETE IF TIMELINE WORKS
// export default async function BirdPostId({params}){

//     const {postId} = await params

//     const query = await db.query(`SELECT * FROM bird_posts WHERE id=$1`, [postId])
//     console.log(query)

//     const data=query.rows[0]
//     console.log(data)

//     if (query.rows.length === 0){
//         notFound()
//     }

//     const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         });


//     return(
//         <>
//             <div key={data.id} className={birdPostStyles.birdPost}>
//                 <img
//                     src={data.img_src}
//                     alt={`Photo of a ${data.bird_type}, spotted in ${data.location} by ${data.username}`}/>

//             <div className={birdPostStyles.postDetails}>
//                 <h3>
//                     <Link href={`/profile/${data.username}`} className={birdPostStyles.userLink}>
//                     {data.username}
//                     </Link>
//                 </h3>

//                 <p>
//                     <strong>Type of bird: </strong> {data.bird_type}
//                 </p>
//                 <p>
//                     <strong>Sighting: </strong> {data.location} on {formattedDate}
//                 </p>
//                 <p>
//                     <strong>Comments: </strong> {data.comment}
//                 </p>
//             </div>
//             </div>

            
        
//         </>
//     )

// }

// OLD STUFF PROBS DELETE
// .map:
//  {birdpost.map((post)=>(
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
//             </div>

            
//         ))}