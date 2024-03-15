import { PropsWithChildren } from "react"

export interface ButtonProps extends PropsWithChildren {
  onResponse: Function,
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined,
  icon?: string | undefined
}