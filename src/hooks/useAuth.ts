import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export const useAuth = (requiredRole?: 'gym_user' | 'gym_owner') => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const [isDemoUser, setIsDemoUser] = useState(false);

  useEffect(() => {
    // Check for demo user
    const demoData = sessionStorage.getItem("demo_user");
    if (demoData) {
      const demo = JSON.parse(demoData);
      setUser({ id: demo.id, email: demo.email } as User);
      setIsDemoUser(true);
      setHasRequiredRole(true);
      setLoading(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const checkRole = async () => {
      if (user && requiredRole && !isDemoUser) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', requiredRole)
          .single();
        
        setHasRequiredRole(!!data);
      }
    };

    checkRole();
  }, [user, requiredRole, isDemoUser]);

  return { user, session, loading, hasRequiredRole, isDemoUser };
};
