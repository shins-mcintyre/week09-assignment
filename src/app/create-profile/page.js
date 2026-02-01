
import {db} from "@/utils/dbConnection.js"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"
import formStyles from "@/styles/form.module.css"
import { currentUser } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"
import Header from "@/components/Header"

export default function CreateProfilePage(){

    async function handleSaveProfile(formData){
        "use server"

        // get user Id from Clerk
        const {userId} = await auth()
        // if (!userId) redirect("/sign-up")
        
        const user = await currentUser()

        // store form values as an object
        const formValues={
            homeLocation: formData.get("home-location"),
            profilePhoto: formData.get("profile-photo"),
            favBird: formData.get("fav-bird"),
            bio: formData.get("bio"),
        }

        console.log(formValues)

         db.query(`
            INSERT INTO birdwatchers 
            (user_id, username, fav_bird, bio, home_location, profile_photo) VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [
                userId,
                user?.username,    
                formValues.favBird,
                formValues.bio,
                formValues.homeLocation,
                formValues.profilePhoto
            ]
        )
        console.log("Profile info saved")

        revalidatePath(`/profile/${user?.username}`)
        redirect(`/profile/${user?.username}`)
    }
    return(
        <>
        <Header/>
        <section className="form-page">
            <div className="form-wrapper">
                <section className="form-title">
                    <h2 className="h2">Tell us about yourself...</h2>
                </section>

                <form className="form" action={handleSaveProfile}>
                    <div className="form-row">
                        <label htmlFor="home-location">Where do you live?</label>
                        <input
                            type="text"
                            required
                            name="home-location"
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="profile-photo">Add a profile photo:</label>
                        <input
                            type="url"
                            required
                            name="profile-photo"
                            placeholder="Paste a url in here"
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="fav-bird">We know it's hard to choose but... what is your favourite bird?</label>
                        <input
                            type="text"
                            required
                            name="fav-bird"
                            />
                    </div>

                    <div className="form-row">
                        <label htmlFor="bio">Tell us more about you and your birdwatching...</label>
                        <input
                            type="text"
                            required
                            name="bio"
                            />
                    </div>

                    <button type="submit">Add to profile</button>
          
            
            {/* the info will be POSTED into the birdwatchers table, using the user_id of the user who is logged in to link with the db so it is added into the correct row */}
        </form>
        </div>
        </section>
        </>
    )
}

// here we post the userID (using auth()) AND the data collected from this form to our db

// const {userId} = auth() - to extract userId from clerk

