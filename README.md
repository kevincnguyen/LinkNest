# 🪹 LinkNest

#### LinkNest is a full-stack Linktree clone built using the MERN stack. 

https://linknest.onrender.com/

![LinkNestDemo](https://github.com/kevincnguyen/LinkNest/assets/68757183/99d0e3b2-ca86-4959-accb-ccd5cdb4ce0f)

## :hatching_chick: Video Demo

[https://www.youtube.com/watch?v=Q8zekBfQpMQ](https://youtu.be/r_a6vgxQnN4)

## :hatched_chick: Features

- Create and manage a personalized collection of links
- Reorder and organize your links using drag-and-drop functionality
- User authentication and secure token-based sessions
- Responsive design for optimal viewing on various devices


## :baby_chick: Tech Stack

**Frontend:**

![reactjs](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![react-router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![tailwindcss](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)&nbsp;

- Including: React Beautiful DND, React Toastify, daisyUI, SweetAlert2

**Backend:**

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;

**Testing:**

![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)&nbsp;
![postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)&nbsp;

**Deployed On:**

![render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## :chicken: Getting Started

#### These are instructions to copy the project locally for development and testing purposes. 

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [Node.js](http://nodejs.org) /  npm (comes with Node)  | `~^18.17.0` / `~^9.7.1` |

### Installing

>Create a new directory and initialize Git

```
mkdir LinkNest
cd LinkNest
git init
```
>Pull from GitHub

```
git pull https://github.com/kevincnguyen/LinkNest.git
```

>Navigate to the backend directory and run npm install:

```
cd backend
npm install
```

>Create a .env file with the following contents:
```
MONGODB_URI= <Connection to production MongoDB database>
TEST_MONGODB_URI= <Connection to test MongoDB database>
PORT= <Port for running development server>
ACCESS_TOKEN_SECRET= <Secret string for access token>
REFRESH_TOKEN_SECRET= <Secret string for refresh token>
```

>Navigate to the frontend directory and run npm install:

```
cd ..
cd frontend
npm install
```

### Running the App

>From the root directory, navigate to the development backend directory and run the server:

```
cd backend
npm run dev
```

>Navigate to the frontend directory and run the development frontend client:

```
cd ..
cd frontend
npm run dev
```
> Open http://localhost:3000 to view the app in the browser

## :penguin: License

This project is licensed under the [MIT License](LICENSE).

---

*Disclaimer: This project is inspired by Linktree but is developed independently as a personal project. It is not affiliated with or endorsed by Linktree.*
