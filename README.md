# SkillHive

SkillHive is a **micro-time skill-sharing platform** that connects users to exchange skills through **30-minute interactive sessions**. The platform features **authentication, real-time chat, skill matching, and a request system**, enabling seamless collaboration between users.

## Features

### Authentication System

- Firebase authentication with **email/password** and **Google sign-in**.
- Responsive authentication dialog with **login and signup** tabs.
- User profile storage in **Firestore**.
- Authentication state management throughout the app.

### Real-time Chat with Socket.IO

- Fully functional **chat dialog** for matched users.
- **Socket.IO** for **real-time bidirectional** communication.
- Server-side **Socket.IO implementation** for message handling.
- **Session scheduling** functionality within the chat.

### Skill Request System

- **Skill request dialog** for accepting/declining requests.
- **Match creation** in Firestore when requests are accepted.
- Integrated **skill matching demo** with the chat functionality.

### Engaging Website UI

- **Modern, minimalist design** with a **purple primary color scheme**.
- **Comprehensive sections**:
  - Hero section explaining the core concept.
  - Stats section showcasing platform usage.
  - Features section highlighting key aspects.
  - Interactive skill matching demo.
  - Step-by-step guide on how it works.
  - Dashboard preview showing user interface.
  - Testimonials from satisfied users.
  - Strong call-to-action sections.
- **Interactive Components**:
  - **Skill matching demo** that simulates the matching process.
  - **Testimonial carousel** with automatic rotation.
  - **Interactive dashboard preview** with tabs.
- **Fully responsive** across all devices.

### Additional Improvements

- **All buttons are fully functional** with appropriate actions.
- Authentication state checks before performing actions.
- **Proper dialog flows** for unauthenticated users.
- **Optimized server configuration** for **Socket.IO**.

---

## Installation Guide

### Prerequisites

- **Node.js (>= 16.x)**
- **Firebase** project setup

### 1️. Setup Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password & Google Sign-in).
3. Create a **Firestore Database**.
4. Generate Firebase **config keys**.

### 2️. Setup Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3️. Install Dependencies

Run the following command:

```sh
npm install
```

### 4️. Start the Development Server

To run both Next.js app and Socket.IO server, use:

```sh
npm run dev:all
```

## Project Structure

```
SkillHive
 ┣ public             # Static assets
 ┣ src
 ┃ ┣ components      # Reusable UI components
 ┃ ┣ pages           # Next.js pages
 ┃ ┣ styles         # CSS stylesheets
 ┃ ┗ utils          # Helper functions
 ┣ server           # Backend (Socket.IO implementation)
 ┣ .env.local       # Environment variables (ignored in Git)
 ┣ next.config.js   # Next.js configuration
 ┣ package.json     # Project metadata & scripts
 ┗ README.md        # Project documentation
```

## Usage Guide

### 🔹 User Registration & Login

- Sign up using Email/Password or Google authentication.
- Manage profile details stored in Firestore.

### 🔹 Skill Matching & Requests

- Use the skill matching demo to find skill partners.
- Send & accept requests for skill exchange sessions.

### 🔹 Real-time Chat

- Chat in real time with matched users via Socket.IO.
- Schedule skill exchange sessions within the chat.

## Contributing

1.  Fork the repository.
2.  Clone the repository locally:

        ```sh
        git clone https://github.com/your-username/SkillHive.git
        ```

3.  Create a new branch for your feature:

        ```sh
        git checkout -b feature-name
        ```

4.  Commit changes:

        ```sh
        git commit -m "Add new feature"
        ```

5.  Push the branch:

        ```sh
        git push origin feature-name
        ```

6.  Open a Pull Request.

## Contact

For any questions or feedback, feel free to reach out!
