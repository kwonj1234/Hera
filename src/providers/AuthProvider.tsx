import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

import { User } from "@/types";
import { getUser } from "@/api/users";

type AuthData = {
  session: Session | null,
  loading: Boolean,
  user: User | undefined
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  user: undefined
});

export default function AuthProvider({ children } :PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<Boolean>(true)
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const user = await getUser(session?.user.id)
        setUser(user)
      } else {
        setUser(undefined)
      }
    }

    fetchUser()
  }, [session])

  return <AuthContext.Provider value={{ session, loading, user }}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)