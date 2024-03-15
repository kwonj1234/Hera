import { supabase } from "@/lib/supabase";
import { ButtonProps } from "react-native-paper";

import { Button } from "react-native-paper";

export default function SignOutButton({children, mode, icon} : ButtonProps) {
  return (
    <Button
      mode={mode}
      icon={icon}
      onPress={async () => await supabase.auth.signOut()}
    >
        {children}
    </Button>
  )
}