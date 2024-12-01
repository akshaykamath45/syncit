# Syncit

**Syncit** is a real time collaborative text editor inspired by google docs. It enables multiple users to edit a shared document in real-time while syncing changes across all connected clients.


[**Live Demo**](https://syncit.vercel.app/  
---

## Features

- **Real-Time Collaboration**: Updates are instantly reflected across all open sessions using Firestore listeners.  
- **Content Persistence**: Changes are saved in Firestore, ensuring the document is never lost.  
- **Optimized Performance**: Utilizes `throttle` to minimize the number of writes to the database while maintaining smooth user interaction.  
- **Rich Text Editing**: Built with React Quill for an intuitive and feature rich text editor interface.  

---

## How It Works

### 1. **Loading Content**
- On initialization, the editor fetches the document content from Firestore.
- If no document exists, the editor starts with a blank state.

### 2. **Real-Time Updates**
- Listens for Firestore updates using `onSnapshot`.  
- Automatically updates the local editor's content without overwriting the user's cursor position.

### 3. **Saving Changes**
- Detects local text changes using the `text-change` event from React Quill.
- Throttled updates (every 1 second) are pushed to Firestore using `setDoc`.

---

## Optimizations

- **Throttling**: Saves content at controlled intervals using `lodash`'s `throttle` to reduce Firestore write operations.  
- **Efficient Local Updates**: Distinguishes between local edits and external updates to prevent redundant writes or conflicts.

---

## Future Enhancements
- **Authentication**: Add OAuth based authentication for secure and personalized editing sessions including role-based access control using firebase authentication and firestore rules.
- **User Presence**: Display active collaborators and their cursors.
- **Version History**: Implement a system to track and restore previous document versions.


![image](https://github.com/user-attachments/assets/caf075d9-9688-4d6c-82a2-b9979afcc6bc)


