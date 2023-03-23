import React, { useEffect } from 'react'
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


const Navigation: React.FC = () => {

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
					<li title='Settings'>
						<NavLink
							className={({ isActive }) => (isActive ? styles.active : '')}
							to='/settings'
						>
							<MdOutlineSettings className={styles.icon} />
						</NavLink>
					</li>
				</ul>

				{/* <div className={styles.settings}>
					<a title='Toggle Theme' onClick={onChangeTheme}>
						{theme === 'dark' ? (
							<MdOutlineNightsStay className={styles.icon} />
						) : (
							<MdOutlineLightMode className={styles.icon} />
						)}
					</a>
				</div> */}
			</div>
		</nav>
	)
}

export default Navigation
