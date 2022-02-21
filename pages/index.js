import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'


import Layout from '../src/patterns/Layout';
import api from '../src/api';

export default function Home() {
	const [carouselItems, setCarouselItems] = useState([]);
	
	useEffect(() => {
		api.get('/carousel/get').then(res => {
			console.log(res)
			if (!res.data.success) return;
			setCarouselItems(res.data.items);
		})
	}, []);

	return (
		<Layout	Layout title='Home' carousel={carouselItems}>
			
		</Layout>
	);
};