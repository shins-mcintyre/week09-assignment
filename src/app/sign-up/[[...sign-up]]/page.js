// TODO: render a sign-up page

// - clerk component
// - a form to collect other user data (bio, nickname, location, interests)
// Insert users data into users table so we can render it into the profile page
// can also redirect user to the form after signup instead of on the same page

export default function SignUp(){
    return(
        <>
        {/* Clerk Component */}
        <form>
            <input type="text" name="nickname"/>
            <textarea type="text" name="bio"/>
            <input/>
        </form>
        </>
    )
}