import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";

const auth = getAuth();
const provider = new GoogleAuthProvider();

// List of allowed emails
const allowedEmails = ["zubairimtiaz395@gmail.com", "kamranimtiaz94@gmail.com"];

export const authenticateWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // Check if the user's email is in the allowed list
        if (!allowedEmails.includes(user.email)) {
          toast.error(
            "Access denied. Your email address is not allowed to access this application.",
            {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );

          // Sign out the user if their email is not allowed
          auth.signOut();
          reject(new Error("Email not allowed"));
          return;
        }

        // Continue with your original logic
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        resolve(); // Resolve promise for successful login
         toast.success("Logged In Successfully!", {
           position: "top-right",
           autoClose: 1500,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
      })
      .catch((error) => {
        reject(error); // Reject promise for unsuccessful login
      });
  });
};
