# Week 11 Blog App

A full-stack blog app with a React frontend, an Express backend, MongoDB persistence, and ImageKit-powered image thumbnails.

## Features

- Create, fetch, and delete blog posts
- Upload an optional image thumbnail with each post
- Store image URLs in MongoDB and the actual image in ImageKit
- Show loading and error states in the UI
- Modern purple dashboard layout

## Project Structure

```text
week11/
├── backend/
│   ├── app.js
│   ├── server.js
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
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
- Image uploads are handled by Multer and stored in ImageKit, not MongoDB.

