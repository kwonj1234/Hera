import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { ButtonProps } from "react-native-paper";

import { Button } from "react-native-paper";

export default function SignOutButton({children, mode, icon} : ButtonProps) {
  
  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  }

  return (
    <Button
      mode={mode}
      icon={icon}
      onPress={async () => await signOut()}
    >
        {children}
    </Button>
  )
}