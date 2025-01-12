# laraval-react project

## Overview

This project is a something like Reddit built with Laravel and PHP, designed to help me practice and enhance web development skills. The application mimics the core functionalities of Reddit, allowing users to create posts, comment, and interact with each other. Additionally, it includes features for direct messaging and live chat to facilitate real-time communication among users.

**Note:** This project is still a work in progress (WIP).

## Features

- **User Authentication**: Secure registration and login system.
- **Post Creation**: Users can create, edit, and delete posts.
- **Commenting System**: Users can comment on posts and reply to other comments.
- **Direct Messaging**: Users can send private messages to each other.
- **Live Chat**: Real-time chat functionality for users to communicate instantly.
- **User Profiles**: Each user has a profile page displaying their posts and activity.
- **Upvote/Downvote System**: Users can upvote or downvote posts and comments.
- **Search Functionality**: Users can search for posts and users.

## Technologies Used

- **Laravel**: PHP framework for building the application.
- **SQLite**: Database management system for storing user data and posts.
- **React**: Frontend framework for building interactive user interfaces.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/reddit-clone.git
   cd reddit-clone
   ```

2. **Install dependencies**:
   ```bash
   composer install
   npm install
   ```

3. **Set up the environment**:
   - Copy the `.env.example` file to `.env` and configure your database settings.
   ```bash
   cp .env.example .env
   ```

4. **Generate application key**:
   ```bash
   php artisan key:generate
   ```

5. **Run migrations**:
   ```bash
   php artisan migrate
   ```

6. **Start the development server**:
   ```bash
   php artisan serve
   ```

7. **Access the application**:
   Open your browser and go to `http://localhost:8000`.

