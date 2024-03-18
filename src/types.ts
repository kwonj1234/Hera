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

export class User {
  id: String
  firstName: String
  lastName: String
  primary: Boolean

  constructor({user_uid, first_name, last_name, primary_caregiver} : UserType) {
    this.id = user_uid
    this.firstName = first_name
    this.lastName = last_name
    this.primary = primary_caregiver
  }
}