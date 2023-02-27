# Build a User Management App with React

This is a Firebase version of the Supabase official tutorial: https://supabase.com/docs/guides/getting-started/tutorials/with-react
It will help you compare Firebase and Supabase.

This tutorial demonstrates how to build a basic user management app. The app authenticates and identifies the user, stores their profile information in the database, and allows the user to log in, update their profile details, and upload a profile photo. The app uses:

- Firestore Database - a document database for storing your user data and Security Rules so data is protected and users can only access their own information.
- Firebase Authentication - users log in through magic links sent to their email (without having to set up passwords).
- Firebase Storage - users can upload a profile photo.

## Project setup

Before we start building we're going to set up our Database and API. This is as simple as starting a new Project in Firebase and then creating a web application.

### Create a project

1. [Create a new project](console.firebase.google.com/) in the Firebase Console.
2. Enter your project details.
3. Wait for the new project to launch.

### Set up the database

Now we are going to set up the database.

1. Go to the Firestore Database page in the Dashboard.
2. Initialize the database in your preferred region.

### Get the API Keys

Now that you've created the database, you are ready to insert data using the API. We just need to get the project settings from the API settings.

1. Go to the Project Settings page in the Dashboard.
2. Set up a new Web app
3. Find your project config on this page.

## Building the App

Let's start building the React app from scratch.

### Initialize a React app#

We can use Create React App to initialize an app called firebase-react:

```
npx create-react-app firebase-react
cd firebase-react
```

Then let's install the only additional dependency: `firebase`.

```
npm install firebase
```

Create and edit `src/firebaseClient.js`. Paste the project config from your web app that you set up earlier.

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

Edit `src/App.js` and import the new file to initalize Firebase on startup:

```diff
import logo from "./logo.svg";
import "./App.css";
+import "./firebaseClient";
```

And one optional step is to update the CSS file `src/index.css` to make the app look nice. You can find the full contents of this file [here](https://raw.githubusercontent.com/supabase/supabase/master/examples/user-management/react-user-management/src/index.css).

### Set up a Login component

Let's set up a React component to manage logins and sign ups. We'll use Magic Links, so users can sign in with their email without using passwords.

Create and edit `src/Auth.js`:

```jsx
import { useState } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const auth = getAuth();

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: "http://localhost:3000/finishSignUp",
        // This must be true.
        handleCodeInApp: true,
      };
      const { error } = await sendSignInLinkToEmail(
        auth,
        email,
        actionCodeSettings
      )
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", email);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Firebase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        {loading ? (
          "Sending magic link..."
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```
