// @ts-ignore
import dialogBackgroundIcon from '@icon/dialogBackgroundIcon.png'
import { DialogHandler } from '@model/DialogHandler'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'

type Props = {
    title: string
    message: string
    buttonText: string
    selectDialog: DialogHandler
    handleSubmit: () => Promise<void>
}

export default function SelectDialog({
    title,
    message,
    buttonText,
    selectDialog,
    handleSubmit
}: Props) {
    return (
        <Dialog
            open={selectDialog.isOpen}
            PaperProps={{
                style: {
                    backgroundImage: `url(${dialogBackgroundIcon.toString()})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: '-65px',
                    backgroundPositionY: '50px',
                    position: 'relative'
                }
            }}
        >
            <DialogTitle
                variant='h5'
                color='textColor.description'
                aria-label='select'
                sx={{ width: '600px' }}
            >
                {title}
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: '0' }}>
                <DialogContentText
                    aria-label='message'
                    variant='subtitle1'
                    color='textColor.body'
                    sx={{ lineHeight: '48px' }}
                >
                        {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => selectDialog.close()}>キャンセル</Button>
                <Button
                    type='button'
                    onClick={async () => {
                        await handleSubmit()
                    }}
                >
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
