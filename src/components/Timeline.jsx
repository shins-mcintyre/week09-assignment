// timeline component

import Link from "next/link"
import birdPostStyles from "@/styles/birdPost.module.css"


export default function Timeline({posts, showActions=false}){
    if (!posts || posts.length === 0 ){
        return <p className={birdPostStyles.p}>No sightings yet</p>
    }

    return(
        <>
        <section className={birdPostStyles.timelineContainer}>
        {posts.map((post)=>{
            const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })

            return(
                <div key={post.id} className={birdPostStyles.postContainer}>
                    <img
                        src={post.img_src}
                        alt={`Photo of a ${post.bird_type}`}
                        className={birdPostStyles.image}
                    />

                    <div className={birdPostStyles.postDetails}>
                        <h3>
                            <Link
                                href={`/profile/${post.username}`}
                                className={birdPostStyles.userLink}>
                                {post.username}
                            </Link>
                        </h3>

                        <p><strong>Type:</strong> {post.bird_type}</p>
                        <p><strong>Sighting:</strong> {post.location} on {formattedDate}</p>

                        {post.comment && (
                            <p><strong>Comments:</strong> {post.comment}</p>
                        )}

                        {showActions &&(
                            <div className={birdPostStyles.actions}>
                                <Link href={`/profile/${post.id}/edit`} className={birdPostStyles.editButton}>
                                    Edit
                                </Link>
                                {" | "}
                                <form action={`/posts/${post.id}/delete`} method="POST">
                                    <button type="submit" className={birdPostStyles.deleteButton}>Delete</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )
            })}
            </section>
        </>
    )
}