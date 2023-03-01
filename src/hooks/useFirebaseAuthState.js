import { useEffect, useState } from 'react';
import { showOverlayLoading } from '../components/OverlayLoading';
import { firebaseAuthStateChanged, firebaseSignOut } from '../firebase/auth';
import { userSnapshot } from '../firebase/cloudFirestore';

const useFirebaseAuthState = () => {
  const [user, setUser] = useState();

  const handleLogout = async () => {
    try {
      showOverlayLoading(true);
      await firebaseSignOut();
    } catch (error) {
      showTopToast(error);
    } finally {
      showOverlayLoading(false);
    }
  };

  useEffect(() => {
    let snapshotUnsubscribe;
    const unsubscribe = firebaseAuthStateChanged((userAuth) => {
      if (userAuth?.uid) {
        snapshotUnsubscribe = userSnapshot(userAuth.uid, async (user) => {
          if (user.data()) {
            if (user.data()?.deletedAt) {
              await handleLogout();
              setUser(null);
              return;
            }
            setUser({ ...user.data(), id: user.id });
          }
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
      snapshotUnsubscribe?.();
    };
  }, []);

  return user;
};

export default useFirebaseAuthState;
