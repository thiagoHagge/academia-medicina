import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardActionArea } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Modal from '@mui/material/Modal';
import Form from 'react-bootstrap/Form';
import FormData from 'form-data'

import Layout from '../../src/patterns/Layout';
import api from '../../src/api';

export default function Carousel() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [carouselItems, setCarouselItems] = useState([]);
    const [itemId, setItemId] = useState(0);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (api.get('/carousel/get').then(res => {
            finishRequest(res);
        }))()
    });

    const openModal = (itemObject = null) => {
        setModalVisible(true)
        if (!itemObject) return
        setItemId(itemObject.id)
        setTitle(itemObject.title)
        setSubtitle(itemObject.subtitle)
    }

    const closeModal = () => {
        setModalVisible(false)
        setItemId(0)
        setTitle('')
        setSubtitle('')
        setImage(null)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const sendRequest = () => {
        let data = new FormData();
        if (itemId) {
            data.append('id', itemId);
        }
        if(image) {
            data.append('image', image);
        }
        data.append('title', title);
        data.append('subtitle', subtitle);
        
        console.log(title, subtitle, image);
        api.post('/carousel/new', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        }).then((res) => {
            finishRequest(res)
        })
    }
    const deleteItem = (id) => {
        api.delete(`/carousel/delete/${id}`).then(res => finishRequest(res))
    }

    const finishRequest = (res) => {
        // TODO: Show error on get
        if (!res.data.success) {
            setErrorMessage(res.data.error)
            return;
        } 
        closeModal()
        setCarouselItems(res.data.items);
    }

    return (
        <Layout>
			<Grid container spacing={2} >
                <Grid item xs={4}>
                    <Card sx={{height: '100%'}}>
                        <CardActionArea sx={{height: '100%'}} onClick={openModal}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                <AddRoundedIcon sx={{fontSize: 40}} /> 
                                <Typography
                                    variant="h6"
                                >
                                    Novo Item
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Grid>
                {carouselItems.map(({id, title, subtitle, image}) => <Grid item xs={4} key={id}>
                    <Card>
                        <CardActionArea onClick={() => openModal({id, title, subtitle})}>
                            <CardMedia
                            component="img"
                            height="140"
                            // TODO: lINK EM .ENV
                            image={`http://localhost:8000/images/${image}`}
                            alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {subtitle}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>)}
            </Grid>
            {/* Colocar inputs obrigatórios para criar novos */}
            <Modal
                open={isModalVisible}
                onClose={closeModal}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        {!itemId ? 'Adicionar item ao carousel' : 'Atualizar item do carousel'}
                    </Typography>
                    {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
                    <TextField 
                        id="title" 
                        label="Nome da seção"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // error={createError !== ''}
                        // helperText={createError}
                    />
                    <TextField 
                        id="subtitle" 
                        label="Nome da seção"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        // error={createError !== ''}
                        // helperText={createError}
                    />
                    <Form.Group controlId="image" className="mb-3">
                        <Form.Control type="file" accept="image/*" onChange={(event) => {
                            setImage(event.target.files[0])}} />
                    </Form.Group>
                    {/* TODO: Colocar botões um do lado do outro */}
                    {itemId && <Button
                        onClick={() => deleteItem(itemId)}
                        sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        Deletar
                    </Button>}
                    <Button
                        onClick={sendRequest}
                        sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                        {!itemId ? 'Criar' : 'Editar'}
                    </Button>
                </Box>
            </Modal>
        </Layout>
    )
}
