export interface Toast {
    type: ToastType,
    message?: string
}

export enum ToastType {
    None = "None",
    Error = "Error",
    Success = "Success",
    Alert = "Alert"
}
