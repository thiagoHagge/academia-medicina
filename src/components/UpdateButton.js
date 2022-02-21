import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

export function UpdateButton({enable, ...rest}) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Button 
            variant="contained" 
            sx={{mt: 2, marginLeft: 'auto'}} 
            disabled={!enable}
            {...rest}
            >
                {enable ? 'Enviar' : 'Atualizado'}
            </Button>
        </Box>
    )
}