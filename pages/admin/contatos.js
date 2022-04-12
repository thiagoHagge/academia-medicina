import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Layout from '../../src/patterns/Layout';
import api from '../../src/api';
import ActionLine from '../../src/patterns/ActionLine';
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

export default function Contact({error = false, pages = [], contact = {}}) {
    // console.log(oldCarouselItems)
    const [phone, setPhone] = useState(contact.phone);
    const [email, setEmail] = useState(contact.email);
    const [whatsapp, setWhatsapp] = useState(contact.whatsapp);
    const [whatsappMessage, setWhatsappMessage] = useState(contact.whatsappMessage);
    const [facebook, setFacebook] = useState(contact.facebook);
    const [instagram, setInstagram] = useState(contact.instagram);
    const [spotify, setSpotify] = useState(contact.spotify);
    const [youtube, setYoutube] = useState(contact.youtube);
    const [enable, setEnable] = useState(false);
    const { token } = useAuth();



    function sendRequest(file) {
        let data = {}
        data.phone = phone
        data.email = email
        data.whatsapp = whatsapp
        data.whatsappMessage = whatsappMessage
        data.facebook = facebook
        data.instagram = instagram
        data.spotify = spotify
        data.youtube = youtube
        api.put('/contato/update', data, {
            headers: {'X-Token': token}
        }).then((res) => {
            setEnable(false)
        })
    }

    function maskNumber(number) {
        let x = number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }

    function validateEmail(email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    return (
        <Layout error={error} navbarEditable pages={pages} contact={contact}>
            <Box>
                <TextField 
                label="Telefone" 
                variant="outlined" 
                inputProps={{ maxLength: 191 }}
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}}
                value={phone}
                onChange={(e) => {
                    setEnable(true)
                    let value = maskNumber(e.target.value)
                    setPhone(value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <TextField 
                label="Email"
                type="email"
                variant="outlined" 
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}}
                value={email}
                onChange={(e) => {
                    setEnable(true)
                    setEmail(e.target.value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <TextField 
                label="Whatsapp" 
                variant="outlined" 
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}}
                value={whatsapp}
                onChange={(e) => {
                    setEnable(true)
                    let value = maskNumber(e.target.value)
                    setWhatsapp(value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <TextField 
                label="Mensagem padrão Whatsapp" 
                variant="outlined" 
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}}
                value={whatsappMessage}
                onChange={(e) => {
                    setEnable(true)
                    setWhatsappMessage(e.target.value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <TextField 
                label="Facebook" 
                variant="outlined" 
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}}
                value={facebook}
                onChange={(e) => {
                    setEnable(true)
                    setFacebook(e.target.value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <TextField 
                label="Instagram" 
                variant="outlined" 
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}}
                value={instagram}
                onChange={(e) => {
                    setEnable(true)
                    setInstagram(e.target.value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <TextField 
                label="Feed do spotify" 
                variant="outlined" 
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}}
                value={spotify}
                onChange={(e) => {
                    setEnable(true)
                    setSpotify(e.target.value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <TextField 
                label="Youtube" 
                variant="outlined" 
                sx={{mb: 2, width: {xs: '90%', md:'45%'}, mx: '2.5%'}} 
                value={youtube}
                onChange={(e) => {
                    setEnable(true)
                    setYoutube(e.target.value)
                }}
                // error={videoError !== ''}
                // helperText={videoError}
                />
                <ActionLine enable={enable} updateAction={sendRequest}/>
            </Box>
        </Layout>
    )
}
