import { DialogHandler } from '@model/DialogHandler'
import { useState } from 'react'

export const useDialog = () => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const dialogHandler: DialogHandler = {
		isOpen: dialogOpen,
		open: () => {
			setDialogOpen(true)
		},
		close: () => {
			setDialogOpen(false)
		},
	}

	return dialogHandler
}
