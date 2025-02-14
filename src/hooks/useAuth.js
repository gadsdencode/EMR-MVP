import { useState, useEffect } from 'react';
import { auth } from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState(auth.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  return { user, loading };
}
