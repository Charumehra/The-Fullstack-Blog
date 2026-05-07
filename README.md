# Week 11 Blog App

A small full-stack blog app with a React frontend and a Node.js + Express + MongoDB backend.

## Features

- Create blog posts
- Fetch posts from MongoDB
- Delete posts from the UI and database
- Loading and error states for offline backend scenarios
- Responsive modern purple UI

## Project Structure

```text
week11/
├── backend/
│   ├── app.js
│   ├── server.js
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── models/
│       └── routes/
└── frontend/
	├── src/
	│   ├── App.jsx
	│   ├── api.js
	│   ├── components/
	│   └── index.css
	└── package.json

```

## Notes

- CORS is enabled in the backend.
- The frontend fetches real data from MongoDB through the Express API.
- Delete requests remove the post from both the server and the UI.

