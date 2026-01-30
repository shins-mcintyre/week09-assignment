// delete route

// delete route page

// TODO: delete a specific rollercoaster

// tools:
// - SQL query to delete
// - server function --> trigger delete
// - form --> button 

import {db} from "@/utils/dbConnection"
import { redirect } from "next/navigation"
import {revalidatePath} from "next/cache"
import Link from "next/link"

// server component by default 
// if you want this button in the client, you should create the button as a component and use client
// we have access to params because this route is nested in the dynamic route
export default async function DeletePage({params}){

    const {postId} = await params

    // server functions need to be async
    async function handleDelete(){
        // to make sure this function executes in the server, as the action is linked with a form that is rendered on a browser (client side)
        "use server"
        // delete logic - no need to fetch as we are in the server already. that means we can query the db directly
        // no need to add await if nothing is being returned, but if you want any info from this query to render on client (e.g. show what data has been deleted on the page), then you add await
        db.query(`DELETE * FROM bird_posts WHERE id=$1`, [postId])

        // UX extra
        revalidatePath("/posts")
        redirect("/posts")
    }

    return(
        <>
        <h1>Delete this bird post</h1>

        {/* set up the button to trigger the handle delete action */}
        <form action={handleDelete}>
            <button className="bg-red-600 text-amber-100">Delete</button>
        </form>

        <Link href={`/posts/${postId}`}>Go back</Link>
        </>
    )
}