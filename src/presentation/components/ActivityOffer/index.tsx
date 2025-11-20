import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { DataView } from 'primereact/dataview';
import { useHomeCompany } from './useHomeCompany';
import styles from './styles';
import './styles.css';

const ActivityOffer = () => {
	const { allJob, allHistory, isLoading, isLoadingJob }: any = useHomeCompany();
	const [products, setProducts] = useState([
		{ id: 1, name: 'Hamburger', description: 'Juicy beef patty on a fresh bun with all the fixings', price: 5.99, image: 'https://source.unsplash.com/900x900/?burger', amount: 0 },
		{ id: 2, name: 'Pizza', description: 'Freshly made pizza with your choice of toppings', price: 9.99, image: 'https://source.unsplash.com/900x900/?pizza', amount: 0 },
		{ id: 3, name: 'Salad', description: 'Fresh greens and veggies with your choice of dressing', price: 4.99, image: 'https://source.unsplash.com/900x900/?salad', amount: 0 },
		{ id: 4, name: 'Fries', description: 'Crispy and delicious, perfect as a side or on their own', price: 2.99, image: 'https://source.unsplash.com/900x900/?fries', amount: 0 }
	]);

	const itemTemplate = (item: any) => {
		const [title, setTitle] = useState('');

		useEffect(() => {
			if (!item?.users?.length) {
				setTitle('Aucun candidat');
			} else if (item?.users?.length === 1) {
				setTitle('1 candidat ');
			} else {
				setTitle(`${item?.users?.length} ont postulé `);
			}
		}, [item?.users]);

		return (
			<TouchableOpacity>
				<View style={[styles.card, { backgroundColor: 'white' }]}>
					<Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.name}</Text>
					<View style={styles.cardDates}>
						<Text style={styles.cardDate}>{item?.disponibility}</Text>
						<Text style={styles.cardDate}> - {item?.profil}</Text>
					</View>
					<View style={styles.cardContent}>
						<View style={styles.buttonsContainer}>
							<TouchableOpacity style={styles.actionButton}>
								<Text style={styles.buttonText}>{title}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
		<Text style={styles.title}>Activités sur vos offres</Text>
			<DataView value={allJob} itemTemplate={itemTemplate} paginator rows={4} />
		</View>
	);
};

export default ActivityOffer;
