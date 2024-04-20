import { View } from "react-native"
import { useState } from "react";
import ProfileScreen from "@/app/(profile)/dashboard";
import UploadScreen from "@/app/(profile)/upload";

import { Drawer } from 'react-native-paper'

export default function MainDrawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
 
  return (
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
      />
      <Drawer.Item
        label="Second Item"
      />
    </Drawer.Section>
  )
}