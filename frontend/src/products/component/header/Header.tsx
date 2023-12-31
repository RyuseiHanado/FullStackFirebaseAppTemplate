import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Avatar, IconButton, Typography } from '@mui/material'
import SelectDialog from '@component/dialog/SelectDialog'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import NetworkUserRepository from '@repository/NetworkUserRepository'
import { Outlet } from 'react-router-dom'
import { useDialog } from '@component/dialog/useDialog'

export default function Header() {
    const selectDialog = useDialog()

    const userRepository = new NetworkUserRepository()
    const signOut = async () => {
        await userRepository.signOut()
    }

    return (
        <>
            <AppBar position='relative'>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Avatar src={userRepository.getUser()?.photoURL || ''} />
                    <Typography variant='h6' color='inherit' noWrap>
                        HOME
                    </Typography>
                    <IconButton
                        sx={{ color: '#fff' }}
                        aria-label='signOut'
                        onClick={selectDialog.open}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Outlet />
            <SelectDialog
                title='サインアウト'
                message='サインアウトしますか？'
                buttonText='サインアウト'
                selectDialog={selectDialog}
                handleSubmit={signOut}
            />
        </>
    )
}