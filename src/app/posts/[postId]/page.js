// a page to show an individual post

// link this up properly

import BirdPost from "@/components/BirdPost";

export default async function individualBirdPostPage({params}){

    const {postId}=await params

    return(
        <>
        <BirdPost postId={postId}/>
        </>
    )
}