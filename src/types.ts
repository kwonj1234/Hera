import { PropsWithChildren } from "react"

export interface ButtonProps extends PropsWithChildren {
  onResponse: Function,
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined,
  icon?: string | undefined
}

export type UserType = {
  user_uid: String,
  first_name: String,
  last_name: String,
  primary_caregiver: Boolean
}