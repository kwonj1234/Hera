import { PropsWithChildren } from "react"

export interface ButtonProps extends PropsWithChildren {
  onResponse: Function,
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined,
  icon?: string | undefined
}

export type UserType = {
  id: string,
  first_name: string,
  last_name: string,
  primary_caregiver: boolean
}

export class User {
  id: String
  firstName: String
  lastName: String
  primary: Boolean

  constructor({id, first_name, last_name, primary_caregiver} : UserType) {
    this.id = id
    this.firstName = first_name
    this.lastName = last_name
    this.primary = primary_caregiver
  }
}