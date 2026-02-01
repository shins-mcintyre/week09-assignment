// error page 
"use client"
import Link from "next/link"



export default function ErrorPage({error, reset}){

    return(
        <html>
            <body>
                <h2>Oh no! Could not find the requested profile</h2>
                <p>{error.message}</p>
                <button onClick={()=> reset()}>Try again</button>
                
            </body>
        </html>
    )
}