// bird-post component

// use week 07 assignment to remember how to create this component (for each post card)

// this will then be used in the profile page and posts page

// add edit and delete functionality to this

import pg from "pg"
import {db} from "@/utils/dbConnection"
import birdPostStyles from "@/styles/birdPost.module.css"
import Link from "next/link"

export default async function BirdPost({postId}){

    const birdpost = (await db.query(`SELECT * FROM bird_posts WHERE id=$1`, [postId])).rows

    if (birdpost.length === 0){
        return <p className={birdPostStyles.p}>Bird post not found</p>
    }

    const post = birdpost[0]

    const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        });

    return(
        <>
        {birdpost.map((post)=>(
            <div key={post.id} className={birdPostStyles.birdPost}>
                <img
                    src={post.img_src}
                    alt={`Photo of a ${post.bird_type}, spotted in ${post.location} by ${post.username}`}/>

            <div className={birdPostStyles.postDetails}>
                <h3>
                    <Link href={`/profile/${post.username}`} className={birdPostStyles.userLink}>
                    {post.username}
                    </Link>
                </h3>

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
            </div>

            
        ))}
        </>
    )

}