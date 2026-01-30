//  TODO: render a home page with user navigation or intro to the app

import Header from "@/components/Header"

export default function Homepage(){
  return(
    <>
    <Header/>
    <main>
      <p>Text about birds & birdwatching</p>
      <button>
        Might need to make this button into a link.
        Explore the birds sighted around the world!
        if the user is logged in they are taken to the posts page
        if they are not logged in they are redirected to sign-up page
      </button>
    </main>
    </>
  )
}