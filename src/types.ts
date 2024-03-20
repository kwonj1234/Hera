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
  id: string
  firstName: string
  lastName: string
  primary: boolean

  constructor({id, first_name, last_name, primary_caregiver} : UserType) {
    this.id = id
    this.firstName = first_name
    this.lastName = last_name
    this.primary = primary_caregiver
  }
}

export type LabType = {
  id: number,
  uploaded_at: Date,
  uploaded_by: string,
  patient: string,
  category: string,
  result: string,
  description: string,
  lab_type: string,
  lab_date: Date
}

export class Lab {
  id: number
  uploadedAt: Date
  uploadedBy: string
  patient: string
  category: string
  result: string
  description: string
  labType: string
  labDate: Date

  constructor({id, uploaded_at, uploaded_by, patient, category, result, description, lab_type, lab_date} : LabType) {
    this.id = id
    this.uploadedAt = uploaded_at
    this.uploadedBy = uploaded_by
    this.patient = patient
    this.category = category
    this.result = result
    this.description = description
    this.labType = lab_type
    this.labDate = lab_date
  }
}

export type LabDocumentType = {
  id: number
  uploaded_at: Date
  lab_id: number
  path: string
  description: string
  file_name: string
}

export class LabDocument {
  id: number
  uploadedAt: Date
  labId: number
  path: string
  description: string
  fileName: string

  constructor({id, uploaded_at, lab_id, path, description, file_name}: LabDocumentType) {
    this.id = id
    this.uploadedAt = uploaded_at
    this.labId = lab_id
    this.path = path
    this.description = description
    this.fileName = file_name
  }
}