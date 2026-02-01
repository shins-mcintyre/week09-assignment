Requirements
🎯 Set up user sign-up and user login using Clerk.
- DONE

🎯 Create and display an error/not found page if the user visits a page that doesn’t exist.
- I added an error.js to the profile/[username] page so if someone tries to visit a page of a non existent user the error displays with some navigation to go back

🎯 Use 1 or more Radix UI Primitive component, or something similar (e.g. use of a different component library to enhance UX, not just Tailwind).
- I used a dropdown menu icon component from Radix and added it to the layout, so a user can try to visit home/posts/profile from anywhere, making navigation easier. This is only visible when signed in so non signed in users cant navigate to these pages

🎯 Enable users to create a user profile, and input profile information (such as a user biography) using a form. Users and user information should be stored in their own table in the database and handled with an appropriate route.
- once a user signs up they are asked to add some extra information via a form which is then added to the database and added to their profile page

🎯 Enable users to create posts associated with their Clerk userId. Posts should be displayed on the user’s profile page.
- Users posts are associated with their specific id. each user has their own profile which shows their bio and their own posts

Stretch Requirements
🏹 Allow users to update their content. You can achieve this either with a dynamic route (“/posts/[id]/edit”) or by creating a modal.
- on their own profile, users have the option to both delete and edit their post - the edit button leads them to a form which is pre-filled with the default info 
🏹 Allow users to delete their content.
- as above

🏹 Allow users to view other profiles directly from posts they see on the global timeline, using a dynamic users route (e.g. /user/[userId]).
- from the posts page, if a user clicks on the username of any of the posts (their own or others) it takes them to that users profile page where they can see their bio and their posts

🏹 Let users follow each other by establishing a follower and followee relationship between profiles.
🏹 Enable users to like posts by linking their user_id to the liked_post in a junction table.
🏹 Ensure that a user’s biography cannot be left blank. If a user logs in without one, prompt them to add this information.
- i have made it via the routing and the form that adding a bio is required at sign up

🏹 Create and display an error/not found page if the user visits another users profile that doesn’t exist.
- there is an error page set up for this (see above in requirements notes)

Reflection
Please also provide an assignment reflection in your project README.md file.

Required
🎯 What requirements did you achieve?
- I have tested out my final app and i believe I have met all requirements (except some more complicated stretch goals)

🎯 Were there any requirements or goals that you were unable to achieve?
- I didn't have enough time to fix up certain things such as accessibility/responsiveness
- I also ran out of time to try and style the clerk sign in/up component

🎯 If so, what was it that you found difficult about these tasks?
Optional
🏹 Feel free to add any other reflections you would like to share about your submission, for example:

I found this project quite difficult. The hardest thing for me was managing so many different parts, and ensuring everything was linked up properly so the user can always navigate where they need to go. I was having major issues with trying to render the data - I think getting my head around the auth() currentUser(), how they worked in relation to the data in db. I had a lot of back and forth and hours of errors after I thought I was in the clear. 

To save some time I borrowed css styles from previous projects and other sites

Im really tired now so this reflection is not super long - but if you have any constructive feedabck about the code/the layout of all the pages that would be really helpful. You can probably see in some pages all the code that was tried and tested 

Requesting feedback about a specific part of your submission.
What useful external sources helped you complete the assignment (e.g Youtube tutorials)?
What errors or bugs did you encounter while completing your assignment? How did you solve them?
What went really well and what could have gone better?