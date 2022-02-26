import MenuItem from '@mui/material/MenuItem';

export default function MyMenuItem({hide, children, ...rest}) {
    if (hide) return null
    return (
        <MenuItem {...rest}>
            {children}
        </MenuItem>
    )
}