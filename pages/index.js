import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'


import Layout from '../src/patterns/Layout';
import api from '../src/api';
import News from '../src/patterns/News';

export default function Home() {
	const [carouselItems, setCarouselItems] = useState([]);
	const [news, setNews] = useState([]);
	
	useEffect(() => {
		(async function() {
			api.get('/carousel/get').then(res => {
				// console.log(res)
				if (!res.data.success) return;
				setCarouselItems(res.data.items);
			})
			api.get('/news/get').then(res => {
				// console.log(res)
				if (!res.data.success) return;
				setNews(res.data.news);
			})
		})()
	}, []);

	return (
		<Layout	Layout title='Home' carousel={carouselItems}>
			<News news={news} />
		</Layout>
	);
};