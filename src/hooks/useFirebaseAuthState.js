import { useEffect, useState } from 'react';
import { firebaseAuthStateChanged } from '../firebase';

const useFirebaseAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = firebaseAuthStateChanged((user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useFirebaseAuthState;
