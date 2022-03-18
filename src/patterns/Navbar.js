import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
// ICONS
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import api from '../api';
import theme from '../themes';
import MenuItem from '../components/MenuItem';
import { useAuth } from '../contexts/auth';

export default function Navbar({ editable = false }) {
    const router = useRouter()

    const [anchorNav, setAnchorNav] = useState(null)
    const [dropdown, setDropdown] = useState({key: null, anchor: null})
	const [allowEdit, setAllowEdit] = useState(false)
    // Modais
	const [isCreateModalVisible, setCreateModalVisible] = useState(false)
	const [isTrashVisible, setTrashVisible] = useState(false)

	const [newSection, setNewSection] = useState('')
	const [createError, showCreateError] = useState('')
    const [pages, setPages] = useState([])
    const [newSectionParent, setNewSectionParent] = useState({name: '', id: false})
    const [navActive, setNavActive] = useState('')
    const { token } = useAuth();
    
    const handleOpenNavMenu = (event) => {
        setAnchorNav(event.currentTarget)
    };

    const handleCloseNavMenu = (link = '', hasChildren) => {
        // console.log(link)
        // console.log(hasChildren)
        if (hasChildren !== 'backdropClick') {
            setNavActive(link)
            return
        }
        setAnchorNav(null)
        setNavActive('')
        if (link === '') return
        router.push(`/page/${link}`)
    };

    const handleOpenDropdown = (event, key) => {
        setDropdown({key: key, anchor: event.currentTarget})
    }

    const handleCloseDropdown = () => {
        setDropdown({key: null, anchor: null});
        setNewSectionParent({name: '', id: false})
        // console.log('newSectionParent', newSectionParent.id)
    }

    const openCreateModal = (parent = null) => {
        setCreateModalVisible(true)
        if (parent == null) return
        setNewSectionParent({name: parent.name, id: parent.id})
        // console.log('newSectionParent', newSectionParent.id)
    }

    const closeCreateModal = () => {
        setCreateModalVisible(false)
        setNewSectionParent({name: '', id: false})
        // console.log('newSectionParent', newSectionParent.id)
    }

    const createSection = () => {
        // TODO: tratar recebimento de erros da api
        let body = {name: newSection}
        if (newSectionParent.id != false) {
            body.parent = newSectionParent.id
        }
        api.post('newPage', body, {
            headers: {
                'X-Token': token
            }
        }).then((response) => {
            if (response.data.success) {
                closeCreateModal()
                setNewSection('')
                showCreateError('')
                getSections()
            } else {
                setNewSection('')
                showCreateError(response.data.error)
            }
        })
    }

    const handleDragEnd = (result) => {
        // Hide the trash
        setTrashVisible(false);
        
        const { destination, source, draggableId } = result;
        // console.log(destination);
        
        // If the item was dropped outside the list, do nothing
        if(destination == null) return
        // TODO: tratar loading
        switch(destination.droppableId) {
            case 'trash':
                // console.log('Deletando', draggableId);
                setPages([])
                api.delete(`deletePage/${draggableId}`, {
                    headers: {
                        'X-Token': token
                    }
                }).then((response) => {
                    // TODO: tratar erros
                    // console.log(response)
                    setPages(response.data.pages)
                })
                break;
            case 'sections':
                // Check if the item is being moved to the same position
                if(destination.index === source.index) return
                
                setPages([])
                api.put('setOrder', {
                    "page": draggableId,
                    "position": destination.index,
                    "parent": 0
                }, {
                    headers: {
                        'X-Token': token
                    }
                }).then((response) => {
                    if(!response.data.success) return
                    setPages(response.data.pages)
                })
                break;
            default:
                return
        }

    }

    const showTrash = () => {
        setTrashVisible(true)
    }


    // TODO: SERVER SIDE RENDERING
    const getSections = () => {
        api.get('getPages').then((response) => {
            if(response.data.success) {
                setPages(response.data.pages);
            }
        })
    }

    useEffect(() => {
        getSections();
    }, [])
    
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
        alignItems: 'center'
    };



    return (
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={showTrash}>
            <ThemeProvider theme={theme}>
                <Paper>
                    <AppBar position="static" sx={{backgroundColor: theme.palette.white, color: theme.palette.black.main, boxShadow: 1}}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters sx={{justifyContent: {xs: 'space-between', md: 'flex-start'}}}>
                                {/* Desktop Logo */}
                                <Link href={editable ? '/admin' : '/'} passHref>
                                    <Box
                                        noWrap
                                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
                                    >
                                        <img src="/logo.png" style={{ maxHeight: 80, marginTop: 25, marginBottom: 25 }} alt="" />
                                    </Box>
                                </Link>
                                {/* Mobile Pages */}
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: { xs: 'block', md: 'none' },
                                        }}
                                    >
                                        {pages.map(({link, name, children}) => (
                                            [
                                                <MenuItem key={`mob-${link}`} onClick={() => handleCloseNavMenu(link, (typeof children != 'undefined' && children.length > 0))}>
                                                    <Typography textAlign="center">{name}</Typography>
                                                    {(typeof children != 'undefined' && children.length > 0) && <ArrowDropDownIcon fontSize="8" />}
                                                </MenuItem>,
                                                typeof children != 'undefined' && children.map((child) => (
                                                    <MenuItem key={`mob-${child.link}`} onClick={() => handleCloseNavMenu(child.link)} hide={navActive != link}>
                                                        <Typography textAlign="center">{child.name}</Typography>
                                                    </MenuItem>
                                                ))
                                            ]
                                        ))}
                                    </Menu>
                                </Box>
                                {/* Mobile Logo */}
                                <Link href={editable ? '/admin' : '/'} passHref>
                                    <Box
                                        noWrap
                                        sx={{ display: { xs: 'flex', md: 'none' }, maxHeight: 100, cursor: 'pointer' }}
                                    >
                                        <img src="/logo.png" style={{ maxHeight: 100 }} />
                                    </Box>
                                </Link>
                                <Box sx={{ display: { xs: 'block', md: 'none' }, width: 48 }} alt="">

                                </Box>
                                {/* Desktop Pages */}
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {!allowEdit ? (pages.map(({id, link, name, children}) => (
                                        <div key={`dsk-${link}`}>
                                            <Button
                                            onClick={(event) => {
                                                if(editable || (typeof children != 'undefined' && children.length > 0)) {
                                                    handleOpenDropdown(event, `adm-${link}`)
                                                } else {
                                                    router.push(`${editable ? '/admin' : ''}/page/${link}`)
                                                }
                                            }}
                                            sx={{ my: 2, color: 'black', display: 'block' }}
                                            >
                                                {name}
                                                {(editable || (typeof children != 'undefined' && children.length > 0)) && <ArrowDropDownIcon fontSize="8" />}
                                                
                                            </Button>
                                            <Menu
                                            key={`dropdown-${link}`}
                                            sx={{ mt: '45px' }}
                                            anchorEl={dropdown.anchor}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={dropdown.key == `adm-${link}`}
                                            onClose={handleCloseDropdown}
                                            >
                                                {(editable && (children == 0 || typeof children == 'undefined')) && <MenuItem onClick={() => router.push(`${editable ? '/admin' : ''}/page/${link}`)}>
                                                    <EditIcon fontSize="16" />    
                                                    <Typography textAlign="center">Editar {name}</Typography>
                                                </MenuItem>}
                                                {typeof children != 'undefined' && children.map((child) => {
                                                    return (
                                                        <MenuItem key={`child-${child.link}`} onClick={() => router.push(`${editable ? '/admin' : ''}/page/${child.link}`)}>
                                                            {editable && <EditIcon fontSize="16" />}
                                                            <Typography textAlign="center">{`${editable ? 'Editar ' : ''}${child.name}`}</Typography>
                                                        </MenuItem>
                                                    )
                                                })}
                                                {editable && <MenuItem onClick={() => openCreateModal({id, name})}>
                                                    <AddLinkIcon fontSize="16" />
                                                    <Typography textAlign="center">Nova página</Typography>
                                                </MenuItem>}
                                            </Menu>
                                        </div>
                                    ))) : (
                                        <Droppable droppableId="sections" direction="horizontal" isUsingPlaceholder={false}>
                                        {(provided) => (
                                            <FakeBox className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                                {provided.placeholder}
                                                {pages.map(({link, name, position}) => (
                                                    <Draggable key={`drag-${link}`} draggableId={link} index={position}>
                                                        {(provided) => (
                                                            <FakeButton ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <Typography textAlign="center" sx={{fontSize: 14}}>
                                                                    {name}
                                                                </Typography>
                                                            </FakeButton>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </FakeBox>
                                        )}
                                        </Droppable>
                                    )}
                                </Box>
                                {editable && ( 
                                    <Box sx={{ flexGrow: 0 }}>
                                        {allowEdit && <Tooltip title="Criar nova seção">
                                            <IconButton onClick={openCreateModal} sx={{ p: 0 }}>
                                                <AddRoundedIcon />
                                            </IconButton>
                                        </Tooltip>}
                                        <Tooltip title={allowEdit ? "Desabilitar edição" : "Habilitar edição"}>
                                            <IconButton onClick={() => setAllowEdit(!allowEdit)} sx={{ p: 0 }}>
                                                {allowEdit ? <EditOffIcon color="action" /> : <EditIcon color="action" />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Paper>
                <Modal
                    open={isCreateModalVisible}
                    onClose={closeCreateModal}
                >
                    <Box sx={style}>
                        <Typography variant="h6" component="h2">
                            {!newSectionParent.id ? 'Criar nova seção' : `Criar nova página em: ${newSectionParent.name}`}
                        </Typography>
                        <TextField 
                            label={newSectionParent.name === '' ? 'Nome da seção' : 'Nome da página'}
                            type="text"
                            variant="outlined"
                            inputProps={{ maxLength: 191 }}
                            margin="normal"	
                            value={newSection}
                            onChange={(e) => setNewSection(e.target.value)}
                            error={createError !== ''}
                            helperText={createError}
                        />
                        <Button
                            onClick={createSection}
                            sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                            Criar
                        </Button>
                    </Box>
                </Modal>
                {allowEdit && (
                    <Droppable droppableId="trash" isUsingPlaceholder={false}>
                        {(provided) => (
                            <Box sx={[style, {opacity: isTrashVisible ? 1 : 0}]} {...provided.droppableProps} ref={provided.innerRef}>
                                {provided.placeholder}
                                <Typography variant="h6" component="h2">
                                    Solte a seção aqui para deletar
                                </Typography>
                            </Box>
                        )}
                    </Droppable>
                )}
            </ThemeProvider>
        </DragDropContext>
    )
}

const FakeButton = styled.li`
    margin: 16px 0;
    padding: 6px 8px;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    min-width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FakeBox = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
`;
// Dropdown
/*
<Box sx={{ flexGrow: 0 }}>
    <Tooltip title="Habilitar edição">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {allowEdit ? <EditOffIcon color="action" /> : <EditIcon color="action" />}
        </IconButton>
    </Tooltip>
    <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
    >
        {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
        ))}
    </Menu>
</Box>
*/