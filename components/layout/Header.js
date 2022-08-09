import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { Button, Center, Group } from '@mantine/core';

import BellFill from 'public/icons/bell-fill.svg';
import PersonFill from 'public/icons/person-fill.svg';
import Grid3x3GapFill from 'public/icons/grid-3x3-gap-fill.svg';
import List from 'public/icons/list.svg';
import styles from 'styles/Header.module.scss';

export default function Header(props) {
	let { setIsNavOpen } = props;
	const router = useRouter();

	async function logout() {
		await axios('/api/auth/logout');
		router.push('/login');
	}

	return (
		<>
			<Group position='apart' px={20} className={styles.header}>
				<Center className={styles.logo}>
					<List height='20' width='20' className={`cursor-pointer ${styles.hamburger}`} onClick={() => setIsNavOpen(v => !v)} />
					<Image src='/images/veybit.png' width={24} height={24} alt='Veybit logo' priority />
					<span className={styles.productName}>Mirrage</span>
				</Center>
				<Center className={styles.headerControls}>
					<Grid3x3GapFill className='mx-3' height='24' width='24' />
					<BellFill className='mx-3' height='24' width='24' />
					<div className='mx-3 p-1 bg-light border border-dark rounded-circle' >
						<PersonFill height='24' width='24' />
					</div>
					<Button className='btn btn-outline-danger' onClick={() => logout()}>Logout</Button>
				</Center>
			</Group>
		</>
	)
}
