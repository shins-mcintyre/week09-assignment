// TODO: update an existing post on a page

import formStyles from "@/./styles/form.module.css"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service"
import {db} from "@/utils/dbConnection"
import Link from "next/link"

export default async function EditPage({params}){

    // desctructure
    const {birdpostId} = await params;

    // get current birdpost data
    const query = await db.query(
        `SELECT * FROM bird_posts WHERE id=$1`,
        [birdpostId]
    )

    // wrangle data to reach the object in the array
    const data = query.rows[0]

    async function handleUpdate(formData){
        // update logic
        "use server"

        // input values
        const formValues={
            birdType: formData.get("birdType"),
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
            imgSrc=$5`,
            [
                formValues.birdType,
                formValues.date,
                formValues.location,
                formValues.comment,
                formValues.imgSrc,
                birdpostId
            ])

            // UX
            revalidatePath(`/profile/${user?.username}`)
            revalidatePath(`/posts`)
            revalidatePath(`/posts/${birdpostId}`)
            redirect(`/profile/${user?.username}`)
    }

    return(
        <>
        <section className="form-page">
            <div className="form-wrapper">
                <section className="form-title">
                    <h2 className="h2">Edit your post here...</h2>
                </section>

                <form className="form" action={handleUpdate}>
                    <div className="form-row">
                        <label htmlFor="bird-type">What type of bird did you spot?</label>
                        <input
                            type="text"
                            required
                            name="bird-type"
                            defaultValue={data.birdType}
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="image">Add a photo of the bird: </label>
                        <input
                            type="url"
                            required
                            name="image"
                            placeholder="Paste a url in here"
                            defaultValue={data.imgSrc}
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="date">What date was the sighting?</label>
                        <input
                            type="date"
                            required
                            name="date"
                            defaultValue={data.date}
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="location">Where was the sighting?</label>
                        <input
                            type="text"
                            required
                            name="location"
                            defaultValue={data.location}
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="comment">Add some more information: </label>
                        <input
                            type="text"
                            required
                            name="comment"
                            defaultValue={data.comment}
                            />
                    </div>

                    <button type="submit">Save edits</button>
          
            
            {/* the info will be POSTED into the birdwatchers table, using the user_id of the user who is logged in to link with the db so it is added into the correct row */}
        </form>
        </div>
        </section>
        </>
    )
}