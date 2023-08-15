
import { getAuth, signOut } from "firebase/auth";

const useLogout = () => {
    const handleLogout = async () => {
      try {
        const auth = getAuth()
        await signOut(auth);
      } catch (error) {
        // Handle logout error.
      }
    };
  
    return { handleLogout };
};
  
export default useLogout;
