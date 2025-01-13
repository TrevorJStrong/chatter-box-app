import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useStore';
import { checkToken } from '../api/auth';

const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const response = await checkToken(); 

          if (response.token) {
            useAuthStore.setState({ token: response.token });
            setIsValidToken(true);
          } else {
            logout();
            setIsValidToken(false);
          }
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setIsValidToken(false); 
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [token]);

  return { isLoading, isValidToken };
};

export default useAuthentication;