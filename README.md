## Overview
I built a bar in my apartment that has a QR code that links to this website. Guest can view my wine, beer, and cocktail list with advanced filtering. Additionally there is an admin view where I can add and remove items via database calls with admin privileges.
![menuScreenshot](https://github.com/Kyle01/menu-builder/blob/main/public/readme_pics/screenshot.png)

## Motivation
While they're much easier ways to build a menu, I wanted to build something in a ultra modern stack in order to increase my skills and that I would enjoy building. I think most QR code menus are bad and I wanted to see if I could build one that feels modern, lightweight, and easy to use. Most menus are either PDFs that require a lot of pinch-and-scroll or gunky UIs. I've built a nested-tag based approach here as it fits into the pattern of modern websites. I took a lot of influence from the 2021 Spotify app redesign.
![dashboardPicture](https://github.com/Kyle01/menu-builder/blob/main/public/readme_pics/spotify.jpg)

## Technology
* Hosting - [Vercel](https://vercel.com/) 
* Framework - [NextJs](https://nextjs.org/)
* CSS Framework - [Tailwind](https://tailwindcss.com/)
* Database - [Supabase](https://supabase.io/) ([PostgreSQL](https://www.postgresql.org/))
* Language - [Typescript](https://www.typescriptlang.org/) 

## Technical highlights 
* Static rendering - NextJs makes it simple to construct static pages at build using `getStaticProps`. More on that NextJs feature can be found [here](https://nextjs.org/docs/basic-features/data-fetching).
* ltree for filtering - Postgres 9 has a built in datatype called `ltree` that allows for native tree like structures. This was utilized to make the nested categories. Documentation for ltrees can be [found here](https://www.postgresql.org/docs/9.1/ltree.html).

## Getting Started
I'm currently not accepting merge request. If you'd like to play with the repo yourself: 
* Clone the repo `git clone`
* Integrate with Vercel
* Integrate with supabase
* Run all migrations in order found in the [migration folder](./migrations)
* Begin server `npm run dev` 
* Open with [http://localhost:3000](http://localhost:3000) with your browser

## Next steps 
* I'd like to build out the local recommendations using a Google maps integration that would display if a local attraction/restaurant is open. 
* The routes aren't the best as the root is still the login page and the base URL is from Vercel. I plan on replacing this when I settle on a real URL.
* I also have grand ambitions on building a rasberri pi powered printer that would allow users to order from the menu and automatically print the ticket for me. 