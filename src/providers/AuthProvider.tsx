import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

import { getUser } from "@/api/users";

type AuthData = {
  session: Session | null,
  loading: Boolean,
  user: Object
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  user: {}
});

export default function AuthProvider({ children } :PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<Boolean>(true)
  const [user, setUser] = useState<Object>({})

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      console.log(data.session?.user.id)
      setSession(data.session)
      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange(async (_event, session) => {
      let user
      if (session != null) {
        let user = await getUser(session.user.id)
        console.log(user)
      }
      setSession(session)
    })


  }, [])

  return <AuthContext.Provider value={{ session, loading, user }}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)