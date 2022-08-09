import { Center, Navbar as NavbarSection, Text } from '@mantine/core';
import styles from 'styles/Navbar.module.scss';

import ReceiptCutoff from 'public/icons/receipt-cutoff.svg';
import CodeSlash from 'public/icons/code-slash.svg';
import CurrencyDollar from 'public/icons/currency-dollar.svg';
import GraphUpError from 'public/icons/graph-up-error.svg';
import Gear from 'public/icons/gear.svg';
import StarFill from 'public/icons/star-fill.svg';
import Link from 'next/link';

export default function Navbar() {
	return (
		<>
			{/* Navbar Main Section */}
			<NavbarSection.Section grow mx="-md" px="md" className={`${styles.navSec} ${styles.navSecMain}`}>
				{/* Group1 */}
				{/* <Text color='dimmed' transform='uppercase' className={styles.navSecHeading}></Text> */}
				<ul>
					<Link href='/usage'><a>
						<li>
							<Center inline>
								<GraphUpError className='me-3' fill='teal' height='20' width='20' />
								<Text color='dark'>Usage &amp; Metrics</Text>
							</Center>
						</li>
					</a></Link>
				</ul>
				{/* Group 2 */}
				<Text color='dimmed' transform='uppercase' className={styles.navSecHeading}>Account</Text>
				<ul>
					<Link href='/billing'><a>
						<li>
							<Center inline>
								<ReceiptCutoff className='me-3' fill='blue' height='20' width='20' />
								<Text color='dark'>Billing</Text>
							</Center>
						</li>
					</a></Link>
					<Link href='/account'><a>
						<li>
							<Center inline>
								<Gear className='me-3' fill='gray' height='20' width='20' />
								<Text color='dark'>Settings</Text>
							</Center>
						</li>
					</a></Link>
				</ul>
			</NavbarSection.Section>

			{/* Navbar Footer Section */}
			<NavbarSection.Section className={`${styles.navSec} ${styles.navSecFooter}`}>
				<ul>
					<Link href='https://developer.veybit.in' target='_blank'><a>
						<li>
							<Center inline>
								<CodeSlash className='me-3' fill='black' height='20' width='20' />
								<Text color='dark'>API Reference</Text>
							</Center>
						</li>
					</a></Link>
					<Link href='https://developer.veybit.in' target='_blank'><a>
						<li>
							<Center inline>
								<CurrencyDollar className='me-3' fill='green' height='20' width='20' />
								<Text color='dark'>Price Estimator</Text>
							</Center>
						</li>
					</a></Link>
					<Link href='https://developer.veybit.in' target='_blank'><a>
						<li>
							<Center inline>
								<StarFill className='me-3' fill='yellow' height='20' width='20' />
								<Text color='dark'>Upcomming Features</Text>
							</Center>
						</li>
					</a></Link>
				</ul>
			</NavbarSection.Section>
		</>
	)
}
