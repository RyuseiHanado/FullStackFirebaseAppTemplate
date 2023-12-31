export interface DialogHandler {
    isOpen: boolean
    open: () => void
    close: () => void
}
