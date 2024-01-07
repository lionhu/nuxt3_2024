export type swalIcons = 'warning' | 'error' | 'success' | 'info' | 'question'

export interface paramsToast {
  icon?: swalIcons
  title: string
  timer?: number
  html?: string
}

export interface paramsModal extends paramsToast {
  imageUrl?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
}
export interface paramsAjaxSwal extends paramsToast {
  buttonText: string
  data: any
}

export interface responseError {
  data: any
  error: {
    details: any
    message: string
    name: string
    status: number
  }
}

export type swalError = responseError | any
