import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '@redux/userSlice'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import SendIcon from '@mui/icons-material/Send'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import NetworkUserRepository from '@repository/NetworkUserRepository'
import Copyright from '@component/Copyright'

export default function AuthPage() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [avatarImage, setAvatarImage] = useState<File | null>(null)
    const [isLogin, setIsLogin] = useState(true)
    const [openModal, setOpenModal] = React.useState(false)
    const [resetEmail, setResetEmail] = useState('')

    const userRepository = new NetworkUserRepository()

    const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
        await userRepository
            .sendPasswordResetEmail(resetEmail)
            .then(() => {
                setOpenModal(false)
                setResetEmail('')
            })
            .catch((err) => {
                alert(err.message)
                setResetEmail('')
            })
    }

    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setAvatarImage(e.target.files![0])
            e.target.value = ''
        }
    }
    const signInEmail = async () => {
        await userRepository.signInEmail(email, password)
    }
    const signUpEmail = async () => {
        const authUser = await userRepository.signUpEmail(
            email,
            password,
            username,
            avatarImage
        )
        dispatch(
            updateUserProfile({
                displayName: username,
                photoUrl: authUser.url
            })
        )
    }

    const signInGoogle = async () => {
        await userRepository.signInGoogle()
    }

    const defaultTheme = createTheme()

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component='main' sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    aria-label='image'
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://source.unsplash.com/random?penguin)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar
                            aria-label='lockIcon'
                            sx={{ m: 1, bgcolor: 'secondary.main' }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            {isLogin ? 'サインイン' : 'アカウント作成'}
                        </Typography>
                        <Box component='form' noValidate sx={{width: '100%', maxWidth:'400px', mt: 1}}>
                            {!isLogin && (
                                <>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <IconButton>
                                            <label>
                                                <AccountCircleIcon
                                                    fontSize='large'
                                                    sx={
                                                        avatarImage
                                                            ? { color: 'gray' }
                                                            : {
                                                                color: 'whitesmoke'
                                                            }
                                                    }
                                                />
                                                <input
                                                    type='file'
                                                    style={{ display: 'none' }}
                                                    onChange={
                                                        onChangeImageHandler
                                                    }
                                                />
                                            </label>
                                        </IconButton>
                                    </Box>
                                    <TextField
                                        variant='outlined'
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='username'
                                        label='ユーザーネーム'
                                        name='username'
                                        value={username}
                                        autoComplete='username'
                                        autoFocus
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                        }}
                                    />
                                </>
                            )}
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='メールアドレス'
                                name='email'
                                value={email}
                                autoComplete='email'
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                            <label
                                htmlFor='password'
                                style={{ display: 'none' }}
                            >
                                パスワード
                            </label>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='パスワード'
                                type='password'
                                id='password'
                                value={password}
                                autoComplete='current-password'
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                            <Button
                                fullWidth
                                disabled={
                                    isLogin
                                        ? !email || password.length < 6
                                        : !username ||
                                          !email ||
                                          password.length < 6
                                }
                                variant='contained'
                                name='authSubmit'
                                sx={{ mt: 3, mb: 2 }}
                                onClick={
                                    isLogin
                                        ? async () => {
                                              try {
                                                  await signInEmail()
                                              } catch (err: any) {
                                                  alert(err.message)
                                              }
                                          }
                                        : async () => {
                                              try {
                                                  await signUpEmail()
                                              } catch (err: any) {
                                                  alert(err.message)
                                              }
                                          }
                                }
                            >
                                {isLogin ? 'サインイン' : 'アカウント作成'}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {isLogin && (
                                        <span
                                            aria-label='passwordReset'
                                            onClick={() => setOpenModal(true)}
                                        >
                                            パスワードを忘れましたか?
                                        </span>
                                    )}
                                </Grid>
                                <Grid item>
                                    <span
                                        aria-label='authSwitch'
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin
                                            ? 'アカウントを作成'
                                            : 'サインインする'}
                                    </span>
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                                onClick={signInGoogle}
                            >
                                Googleアカウントでサインイン
                            </Button>
                            <Copyright />
                        </Box>

                        <Dialog open={openModal}>
                            <DialogTitle aria-label='password reset'>
                                パスワードをリセット
                            </DialogTitle>
                            <TextField
                                InputLabelProps={{
                                    shrink: true
                                }}
                                type='email'
                                name='email'
                                label='リセットするメールアドレス'
                                value={resetEmail}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setResetEmail(e.target.value)
                                }}
                            />
                            <IconButton
                                onClick={sendResetEmail}
                                aria-label='send'
                            >
                                <SendIcon />
                            </IconButton>
                            <Button onClick={() => setOpenModal(false)}>
                                閉じる
                            </Button>
                        </Dialog>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
