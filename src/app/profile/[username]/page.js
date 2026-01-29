// TODO: render user's data

// - READ user's data from the user table
// - READ user's posts: render a list of user's personal posts (SQL query that specifies SELECTS all posts of a specific user)

// TIPS:
// - Clerk userID does not exist until the user signs up (new user's cannot see a profile page) --> show sign-up and sign-in buttons first thing. Only the homepage is public, the rest of the routes are protected

// Look at resource links Manny posted in his 
// use currentUser() to access info about current user from Clerk



export default function ProfilePage(){

    // db queries to GET data from the table
    return(
        <>
        <h1>User's Info</h1>
        <h1>User's Posts</h1>
        </>
    )
}
