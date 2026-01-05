🎉 Happy new year **2026** 🎉

# The coding task

## Thought process
- Get jobs with pagination
- When searching, get jobs from recommendations endpoint
- Favourite id is saved in the database
- Get favourite ids and on table rendering, check if the job id of the row is in the favourites
(For the presentation, I use user id = 1 for the favourites' functionality)

## Implementation
> Candidates should be able to browse job opportunities which include job titles, descriptions and company names.

Implemented table with jobs and the above attributes as columns. Pagination included.

> Candidates should be able to search by job title to narrow down the results.

Implemented search bar.

> Candidates should be able to "favourite" the jobs they found interesting. Favouriting a job should let users easily find it again.

Implemented a column named 'Actions' in the table. When user clicks on the heart icon, the job is saved as favourite and the icon is changed to bold.
On reloading the page, the favourites' heart remains bold. This way the user can clearly see which jobs they have selected as favourites.

## Challenges/further thoughts
- Connecting to the backend without hardcoding the full URL.
- Why is the recommendations endpoint POST?
- All these separate requests are heavy and error prone. If I had more time I would save all this in a local database.
- I started implementing a favourites tab, to list only the favourite jobs, but I think the bold hearts in the jobs table are already quite ok for an initial MVP.
- ...

# Architecture diagram task

Implemented the [free delivery service](https://www.skroutz.gr/plus) of the largest e-commerce platform in Greece.
The project was huge, so I selected these two. I'm probably going to present only one of them though.

- [Create subscription](https://docs.google.com/drawings/d/1Y4gJfhB6gaWCVjg9TqdrVC2-gR7yzzcY_YetW_j73qg)

- [Benefit limits](https://docs.google.com/drawings/d/1vuISUbgcTMg8J4SF_86FyeF8jWMT55HwQo8x_RRz_KM)