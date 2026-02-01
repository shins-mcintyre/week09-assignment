//  TODO: render a home page with user navigation or intro to the app

import homepageStyles from "@/styles/homepage.module.css"
import Header from "@/components/Header"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Link from "next/link"

export default function Homepage(){
  return(
    <>
    <section className={homepageStyles.homepageContent}>
    <Header/>
    <main className={homepageStyles.homepageMain}>
      <p className={homepageStyles.quote}>No bird soars too high if he soars with his own wings - William Blake</p>
      <p className={homepageStyles.info}>Welcome to feather finders, the social media for bird nerds!</p>


      {/* To direct users to correct place */}
      <SignedIn>
        <Link href="/posts" className={homepageStyles.button}>
          Explore the birds sighted around the world!
        </Link>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button className={homepageStyles.button}>
            Explore the birds sighted around the world!
          </button>
        </SignInButton>
      </SignedOut>
    </main>
    </section>
    </>
  )
}