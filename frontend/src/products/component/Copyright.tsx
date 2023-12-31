import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import * as React from 'react'

export default function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://images.unsplash.com/photo-1595792419466-23cec2476fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGVuZ3Vpbnx8fHx8fDE2OTg1NzAyMTE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080'>
                Penguin
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}
