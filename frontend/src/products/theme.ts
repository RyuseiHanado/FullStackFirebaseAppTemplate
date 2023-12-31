import { createTheme } from '@mui/material'
import { jaJP } from '@mui/material/locale'

export const theme = createTheme(jaJP, {
	palette: {
		gray: {
			25: '#FCFCFD',
			50: '#F9FAFB',
			100: '#F2F4F7',
			200: '#E4E7EC',
			300: '#D0D5DD',
			350: '#D0D5DD',
			400: '#98A2B3',
			500: '#667085',
			600: '#475467',
			700: '#344054',
			800: '#1D2939',
			900: '#101828',
		},
		red: {
			400: '#EB4141',
			500: '#C82323',
		},
		primary: {
			main: '#3C5AAF',
		},
		secondary: {
			main: '#36BFFA',
		},
		textColorBody: {
			main: '#101828',
		},
		primaryColor: {
			400: '#5F7AC8',
		},
		secondaryColor: {
			200: '#B9E6FE',
		},
		background: {
			default: '#FFFFFF',
		},
		backgroundColor: {
			primary: '#FFFFFF',
			secondary: '#E4E7EC',
			tertiary: '#F2F4F7',
			quatemary: '#1D2939',
			BG: '#000000',
		},
		textColor: {
			light: '#FFFFFF',
			disabled: '#98A2B3',
			placeholder: '#667085',
			description: '#475467',
			body: '#101828',
			alert: '#BA1B1B',
		},
		border: {
			light: '#FFFFFF',
			divider: '#C6CBD3',
			disabled: '#98A2B3',
			field: '#101828',
			selected: '#1976D2',
			alert: '#BA1B1B',
		},
		status: {
			error: '#BA1B1B',
			warning: '#ED6C02',
			success: '#2E7D32',
		},
	},
	typography: {
		h1: {
			fontWeight: '700',
			fontSize: '34px',
			lineHeight: '34px',
			fontFamily: 'YuGothic',
		},
		h2: {
			fontWeight: '700',
			fontSize: '24px',
			lineHeight: '24px',
			fontFamily: 'YuGothic',
		},
		h3: {
			fontWeight: '700',
			fontSize: '20px',
			lineHeight: '20px',
			fontFamily: 'YuGothic',
		},
		h4: {
			fontWeight: '700',
			fontSize: '18px',
			lineHeight: '18px',
			fontFamily: 'YuGothic',
		},
		h5Regular: {
			fontWeight: '500',
			fontSize: '16px',
			lineHeight: '16px',
			fontFamily: 'YuGothic',
		},
		h5Bold: {
			fontWeight: '700',
			fontSize: '16px',
			lineHeight: '16px',
			fontFamily: 'YuGothic',
		},
		caption: {
			fontWeight: '500',
			fontSize: '12px',
			lineHeight: '14px',
			fontFamily: 'YuGothic',
		},
		labelRegular: {
			fontWeight: '500',
			fontSize: '12px',
			lineHeight: '12px',
			fontFamily: 'YuGothic',
		},
		labelBold: {
			fontWeight: '700',
			fontSize: '12px',
			lineHeight: '12px',
			fontFamily: 'YuGothic',
		},
		bodyRegular: {
			fontWeight: '500',
			fontSize: '14px',
			lineHeight: '20px',
			fontFamily: 'YuGothic',
		},
		bodyBold: {
			fontWeight: '700',
			fontSize: '14px',
			lineHeight: '20px',
			fontFamily: 'YuGothic',
		},
		buttonLarge: {
			fontWeight: '700',
			fontSize: '15px',
			lineHeight: '26px',
			fontFamily: 'YuGothic',
		},
		badgeText: {
			fontWeight: '700',
			fontSize: '10px',
			lineHeight: '10px',
			fontFamily: 'YuGothic',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
})
