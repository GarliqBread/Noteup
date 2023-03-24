import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import {
	MdOutlineSpaceDashboard,
	MdOutlineExplore,
	MdOutlineEventNote,
	MdOutlineLightMode,
	MdOutlineNightsStay,
	MdOutlineSettings,
} from 'react-icons/md'

import styles from './Navigation.module.css'
import { SettingsModal } from "@/pages/Notebook/SettingsModal";

const Navigation: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	return (
		<nav className={styles.nav}>
			<div className={styles.menu}>
				<ul>
					<li title='Home'>
						<NavLink
							className={({ isActive }) => (isActive ? styles.active : '')}
							to='/'
						>
							<MdOutlineSpaceDashboard className={styles.icon} />
						</NavLink>
					</li>
					<li title='Tasks'>
						<NavLink
							className={({ isActive }) => (isActive ? styles.active : '')}
							to='/tasks'
						>
							<MdOutlineExplore className={styles.icon} />
						</NavLink>
					</li>
					<li title='Notebooks'>
						<NavLink
							className={({ isActive }) => (isActive ? styles.active : '')}
							to='/notebook'
						>
							<MdOutlineEventNote className={styles.icon} />
						</NavLink>
					</li>
				</ul>

				<div className={styles.settings}>
					<a title='Settings' onClick={() => setShowSettings(true)}>
					<MdOutlineSettings className={styles.icon} />
					</a>
				</div>
				
			</div>
			{showSettings && <SettingsModal closeModal={() => setShowSettings(false)} />}
		</nav>
	)
}

export default Navigation
