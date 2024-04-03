import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";

import { View } from "react-native"
import { Drawer } from "react-native-paper";

export default function SignOutButton() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <View>
      <Drawer.CollapsedItem
        focusedIcon="inbox"
        unfocusedIcon="inbox-outline"
        active={drawerOpen}
        onPress={() => setDrawerOpen(!drawerOpen)}
      ></Drawer.CollapsedItem>
    </View>

  )
}