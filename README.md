# Buzzys - Dive into the Hive of Lively Chats and Make New Connections!

**Buzzys** is a dynamic web messaging application similar to WhatsApp, allowing users to connect and chat without needing phone numbers. Users can log in using their Google accounts and easily find and message other users through the **Contacts** section. The application supports real-time messaging with Socket.io, as well as features like blocking users, sending media, and message search functionality.

<img width="1470" alt="Ekran Resmi 2024-09-09 22 07 30" src="https://github.com/user-attachments/assets/549a53a8-034d-4bc3-be01-d4e0de5dad20">


---
[Watch the demo on YouTube](https://youtube.com/link-to-your-video)

Screenshots are at the bottom of the readme.

## Features

### 1. Profile Section
- View and edit profile picture, username, and bio.
- See blocked users and manage the block list by unblocking users if desired.

### 2. Chat List
- Displays a list of users the current user has previously messaged.
- Search and filter through conversations for easy access.

### 3. Contacts Section
- View all registered users in the application.
- Search functionality to filter users by name or other criteria.

### 4. Settings
- Enable or disable notification sounds for incoming messages.
- Switch between different themes (e.g., dark/light mode).
- Log out of the application.

### 5. Real-Time Messaging
- Messages are sent in real-time using **Socket.io**.
- Users can see the online/offline status of others and whether they are currently in a chat.
- <img width="310" alt="Ekran Resmi 2024-09-09 22 08 20" src="https://github.com/user-attachments/assets/946df7a2-f7b5-49fa-879d-002e6ea48ae0">
- <img width="310" alt="Ekran Resmi 2024-09-09 22 08 11" src="https://github.com/user-attachments/assets/0eef45c2-33b6-480f-b198-fc813c218589">
- <img width="310" alt="Ekran Resmi 2024-09-09 22 08 27" src="https://github.com/user-attachments/assets/5e6260cb-e4ff-4a32-abe6-4d2f0af09e5b">
- Blocked users cannot send or receive messages to/from the user who blocked them.
- 

### 6. Media Support
- Users can send text, audio messages, and images.
- Photos can be selected from the gallery or taken directly within the app.
- Audio messages can be played at 1x, 1.5x, or 2x speed.

### 7. Message Search and Status
- Search through conversations for specific messages.
- Messages are tracked with status indicators: `sent`, `delivered`, and `read`.

---

## Tech Stack

- **Next.js**: Frontend framework
- **MongoDB**: Database to store user and message information
- **Firebase**: Used for storing images and audio files
- **Socket.io**: Enables real-time communication between users
- **Recoil**: State management for a seamless user experience
- **TailwindCSS**: Responsive and customizable styling
- **Radix UI**: UI component library for accessible and customizable interfaces
- **React Hook Form**: Form handling and validation
- **WaveSurfer.js**: Audio waveform visualization for voice messages
- **Zod**: Schema validation for API requests and responses

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/buzz-chat.git

   cd buzz-chat
    ```
2. Install dependencies:

  ```
   npm install
  ```
3. Set up environment variables: Create a .env file in the root directory and add the following:
  
  ```  
   MONGODB_URI=YOUR_MONGODB_URI
   NEXT_PUBLIC_HOSTNAME=hostname
   NEXT_PUBLIC_SECRET_KEY=yourjswebtoken
    
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
  ```
4. Run the development server:
  ```
   npm run dev
  ```

# ScreenShots





## Light Mode Mobile
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/64d002b6-a9f9-4550-aff5-a1d896051844">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/a115b069-aa7a-41cd-919c-2edeb82b7279">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/bb4ac1fc-f28a-446b-8b11-946692a8d881">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/ac6d66af-b499-4a16-9284-e1c09232da60">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/c546e39c-3486-4d24-8022-8fad88bf0b6c">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/121198d4-8e65-4936-becc-bdb7369d87bc">
<img width="300" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/95beb49c-9e2c-46fa-b564-68f69f3719ce">


## Light Mode Desktop
<img width="1470" alt="Ekran Resmi 2024-09-09 22 10 35" src="https://github.com/user-attachments/assets/3734d53f-b82e-4a98-b0fd-2dd7ee6829f8">
<img width="1466" alt="Ekran Resmi 2024-09-09 22 06 34" src="https://github.com/user-attachments/assets/9fbb3844-accd-4bab-85c8-1be618ce894e">
<img width="1470" alt="Ekran Resmi 2024-09-09 22 07 30" src="https://github.com/user-attachments/assets/f31293b4-b05d-4e5e-89b2-85218c0c8a6a">
<img width="1470" alt="Ekran Resmi 2024-09-09 22 08 47" src="https://github.com/user-attachments/assets/809014e6-8d5a-4153-b279-97cd4988d29a">
<img width="1470" alt="Ekran Resmi 2024-09-09 22 08 54" src="https://github.com/user-attachments/assets/f4e472bd-d36f-4145-a031-80130704e32c">
<img width="1470" alt="Ekran Resmi 2024-09-09 22 09 05" src="https://github.com/user-attachments/assets/0fa34901-432b-4855-8b58-35941ab9fb71">

## Dark Mode Desktop
<img width="1470" alt="Ekran Resmi 2024-09-09 22 10 18" src="https://github.com/user-attachments/assets/42dc506c-38f3-4b02-be11-32509bc5aec5">
<img width="1468" alt="Ekran Resmi 2024-09-09 22 09 25" src="https://github.com/user-attachments/assets/ada6cb39-0d07-4b09-bab3-daae5e7e58a3">
<img width="1470" alt="Ekran Resmi 2024-09-09 22 09 51" src="https://github.com/user-attachments/assets/b4909c04-c94c-4286-aa31-6b2f6a72d446">
<img width="1469" alt="Ekran Resmi 2024-09-09 22 10 09" src="https://github.com/user-attachments/assets/543ddba0-53a2-4d4d-9899-574b5ffe7e2c">
<img width="511" alt="Ekran Resmi 2024-09-09 22 09 40" src="https://github.com/user-attachments/assets/fbbd80de-cfca-49ec-b3e3-32e604dc984b">



