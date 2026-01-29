// This modal will pop up onto the ProfileFormPage once the form is submitted -> on submission of the form, this modal will appear saying "Profile updated successfully". It will have 2 buttons -> Checkout my profile or checkout the birds of the worls

import Link from "next/link"

export default function OnboardingModal(){
    return(
        <>
        <p>Profile updated successfully!</p>
        <Link>Take me to my profile</Link>
        <Link>Take me to the birds</Link>
        </>
    )
}