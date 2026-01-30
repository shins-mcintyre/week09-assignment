// TODO: render a form to INSERT post data into the posts table
// we also need to insert the userID into the posts table - make sure we have some SQL that READS userID from the user's table OR use the auth() function from clerk to get the userID

import {db} from "@/utils/dbConnection.js"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"
import formStyles from "@/styles/form.module.css"
import { currentUser } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"

export default function NewPostPage(){

    async function handleSavePost(formData){
        "use server"
        const {userId} = await auth()
        const user = await currentUser()
        const formValues={
            birdType: formData.get("bird-type"),
            date: formData.get("date"),
            location: formData.get("location"),
            comment: formData.get("comment"),
            image: formData.get("image")
        }

        console.log(formValues)

         db.query(`
            INSERT INTO bird_posts 
            (birdwatcher_id, username, bird_type, date, location, comment, img_src) VALUES ($1, $2, $3, $4, $5, $6, $7)
            `,
            [
                userId,
                user?.username,
                formValues.birdType,    
                formValues.date,
                formValues.location,
                formValues.comment,
                formValues.image
            ]
        )
        console.log("Post info saved")

        revalidatePath(`/posts`)
        redirect(`/posts`)
  

    }
    return(
        <>
        <section className="form-page">
            <div className="form-wrapper">
                <section className="form-title">
                    <h2 className="h2">Share your bird sightings here...</h2>
                </section>

                <form className="form" action={handleSavePost}>
                    <div className="form-row">
                        <label htmlFor="bird-type">What type of bird did you spot?</label>
                        <input
                            type="text"
                            required
                            name="bird-type"
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="image">Add a photo of the bird: </label>
                        <input
                            type="url"
                            required
                            name="image"
                            placeholder="Paste a url in here"
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="date">What date was the sighting?</label>
                        <input
                            type="date"
                            required
                            name="date"
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="location">Where was the sighting?</label>
                        <input
                            type="text"
                            required
                            name="location"
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="comment">Add some more information: </label>
                        <input
                            type="text"
                            required
                            name="comment"
                            />
                    </div>

                    <button type="submit">Share post</button>
          
            
            {/* the info will be POSTED into the birdwatchers table, using the user_id of the user who is logged in to link with the db so it is added into the correct row */}
        </form>
        </div>
        </section>
        </>
    )
}


        
  

// here we post the userID (using auth()) AND the data collected from this form to our db

// const {userId} = auth() - to extract userId from clerk

