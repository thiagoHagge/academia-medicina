import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import theme from '../themes';

export function ActionLine({enable, deleteButton = false, updateAction = () => {}, deleteAction = () => {}, ...rest}) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            {deleteButton && <Button
                variant="contained"
                sx={{mt: 2, backgroundColor: theme.palette.danger.main, '&:hover': {backgroundColor: theme.palette.danger.dark}}}
                onClick={deleteAction}
                {...rest}
                >Deletar</Button>}
            <Button 
            variant="contained" 
            sx={{mt: 2, marginLeft: 'auto'}} 
            disabled={!enable}
            onClick={updateAction}
            {...rest}
            >
                {enable ? 'Enviar' : 'Atualizado'}
            </Button>
        </Box>
    )
}