import { useState, useEffect } from 'react';
import Navbar from '../../src/patterns/Navbar';
import api from '../../src/api';

// TODO: aplicar getStaticPath para páginas importantes 
export async function getServerSideProps(context) {
    const { link } = context.query;
    const { data } = await api.get(`getContent/${link}`);
    if (data.success) {
        return {
            props: {
                content: data.content,
            },
        };

    } 
}

export default function Index(props) {
    // get link from url
    
	return (
        <>
		    <Navbar />
            <h1>{props.content}</h1>
        </>
	)
}