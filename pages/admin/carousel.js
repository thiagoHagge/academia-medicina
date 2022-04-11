import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Modal from '@mui/material/Modal';
import Form from 'react-bootstrap/Form';
import FormData from 'form-data'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Layout from '../../src/patterns/Layout';
import api from '../../src/api';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import theme from '../../src/themes';
import { useAuth } from '../../src/contexts/auth';

export async function getStaticProps() {
    const {pages, contact} = await api.get('/getPages').then(res => res.data)
    return api.get('/carousel/get').then(res => {
        if (!res.data.success) {
            return {
                props: {
                    error: res.data.error
                },
                revalidate: 60
            }
        }
        return {
            props: {
                oldCarouselItems: res.data.items,
                pages: pages,
                contact: contact
            },
            revalidate: 60
        } 
    })
}

export default function Carousel({oldCarouselItems = [], error = false, pages = [], contact = {}}) {
    // console.log(oldCarouselItems)
    const [isInputVisible, setInputVisible] = useState(false);
    const [carouselItems, setCarouselItems] = useState(oldCarouselItems);
    const [itemId, setItemId] = useState(0);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useAuth();


    const showInput = (itemObject = null) => {
        setInputVisible(true)
        if (!itemObject) return
        setItemId(itemObject.id)
        setTitle(itemObject.title)
        setSubtitle(itemObject.subtitle)
    }

    const hideInput = () => {
        setInputVisible(false)
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

    function sendRequest(file) {
        let data = new FormData();
        data.append('image', file);
        
        // console.log('image', file);

        api.post('/carousel/new', data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'X-Token': token
            }
        }).then((res) => {
            // console.log(res)
            finishRequest(res)
        })
    }
    const deleteItem = (id) => {
        api.delete(`/carousel/delete/${id}`, {
            headers: {
                'X-Token': token
            }
        }).then(res => finishRequest(res))
    }

    const finishRequest = (res) => {
        // TODO: Show error on get
        if (!res.data.success) {
            setErrorMessage(res.data.error)
            return;
        } 
        hideInput()
        // console.log('finishRequest')
        setCarouselItems(res.data.items);
    }

    return (
        <Layout error={error} navbarEditable pages={pages} contact={contact}>
            <Box>
                <IconButton color="success" onClick={showInput} style={{display: !isInputVisible ? 'block' : 'none'}}>
                    <AddRoundedIcon sx={{fontSize: 40}} /> 
                </IconButton>
                <Form.Group controlId="image" className="mb-3" style={{display: isInputVisible ? 'block' : 'none'}}>
                    <Form.Control 
                    type="file" 
                    accept="image/*" 
                    onChange={(event) => {
                        setImage(event.target.files[0])
                        // console.log(event.target.files[0])
                        // console.log('foi')
                        sendRequest(event.target.files[0])
                    }} 
                    />
                </Form.Group>
                {/* <DragDropContext onDragEnd={handleDragEnd} onDragStart={showTrash}> */}
                    {/* <Droppable droppableId="images" direction="horizontal" isUsingPlaceholder={false}> */}
                        {/* {(provided) => ( */}
                            <ImageList
                            sx={{}}
                            variant="quilted"
                            cols={2}
                            rowHeight={121}
                            >
                                {/* {provided.placeholder} */}
                                {carouselItems.map(({id, image, position}) => (
                                    
                                    <ImageListItem key={`img-${id}`}>
                                            {/* <Draggable key={`img-${id}`} draggableId={id} index={position}> */}

                                            <img
                                            src={image}
                                            srcSet={image}
                                            loading="lazy"
                                            alt=""
                                            />
                                            <ImageListItemBar
                                            sx={{backgroundColor: '#00000000'}}
                                            actionIcon={(
                                                <IconButton
                                                sx={{ color: theme.palette.danger.main }}
                                                onClick={() => deleteItem(id)}
                                                >
                                                    <DeleteForeverRoundedIcon />
                                                </IconButton>
                                            )}
                                            />
                                        {/* </Draggable> */}
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        {/* )} */}
                    {/* </Droppable>
                </DragDropContext> */}
            </Box>
        </Layout>
    )
}
