// TODO: update an existing post on a page

import formStyles from "@/./styles/form.module.css"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service"
import {db} from "@/utils/dbConnection"
import Link from "next/link"
import {currentUser} from "@clerk/nextjs/server"

export default async function EditPage({params}){

    
    // desctructure
    const {postId} = await params;


    // get current birdpost data
    const query = await db.query(
        `SELECT * FROM bird_posts WHERE id=$1`,
        [postId]
    )

    // if (query.rows.length === 0){
    //     return<p>Post not found</p>
    // }

        // wrangle data to reach the object in the array
    const data = query.rows[0]
    console.log(data)

    const user = await currentUser();

    async function handleUpdate(formData){
        // update logic
        "use server"

        // input values
        const formValues={
            birdType: formData.get("bird-type"),
            date: formData.get("date"),
            location: formData.get("location"),
            comment: formData.get("comment"),
            imgSrc: formData.get("image"),
        }

        db.query(
            `UPDATE bird_posts SET 
            birdType=$1,
            date=$2,
            location=$3,
            comment=$4,
            imgSrc=$5
            WHERE id=$6`,
            [
                formValues.birdType,
                formValues.date,
                formValues.location,
                formValues.comment,
                formValues.imgSrc,
                postId
            ])

            // UX
            revalidatePath(`/posts`)
            revalidatePath(`/posts/${postId}`)
            redirect(`/posts/${postId}`)
    }

            const formattedDate = data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : "";

    return(
        <>
        <section className={formStyles.formPage}>
            <div className={formStyles.formWrapper}>
                <section className={formStyles.formTitle}>
                    <h2 className={formStyles.h2}>Edit your post here...</h2>
                </section>

                <form className={formStyles.form} action={handleUpdate}>
                    <div className={formStyles.formRow}>
                        <label htmlFor="bird-type">What type of bird did you spot?</label>
                        <input
                            type="text"
                            required
                            name="bird-type"
                            defaultValue={data.bird_type}
                            />
                    </div>

                    <div className={formStyles.formRow}>
                        <label htmlFor="image">Add a photo of the bird: </label>
                        <input
                            type="url"
                            required
                            name="image"
                            placeholder="Paste a url in here"
                            defaultValue={data.img_src}
                            />
                    </div>

                    <div className={formStyles.formRow}>
                        <label htmlFor="date">What date was the sighting?</label>
                        <input
                            type="date"
                            required
                            name="date"
                            defaultValue={formattedDate}
                            />
                    </div>

                    <div className={formStyles.formRow}>
                        <label htmlFor="location">Where was the sighting?</label>
                        <input
                            type="text"
                            required
                            name="location"
                            defaultValue={data.location}
                            />
                    </div>

                    <div className={formStyles.formRow}>
                        <label htmlFor="comment">Add some more information: </label>
                        <input
                            type="text"
                            required
                            name="comment"
                            defaultValue={data.comment}
                            />
                    </div>

                    <button className={formStyles.button} type="submit">Save edits</button>
          
            
            {/* the info will be POSTED into the birdwatchers table, using the user_id of the user who is logged in to link with the db so it is added into the correct row */}
        </form>
        </div>
        </section>
        </>
    )
}