import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Notfound.module.css';

const NotFoundRoute = () => {
	const history = useHistory();

	return (
		<div className={styles.container}>
			<div className={styles.error}>
				<p className={styles.p}>4</p>
				<span className={styles.dracula}>
					<div className={styles.con}>
						<div className={styles.hair}></div>
						<div className={styles.hairR}></div>
						<div className={styles.head}></div>
						<div className={styles.eye}></div>
						<div className={styles.eye1}></div>
						<div className={styles.mouth}></div>
						<div className={styles.blod}></div>
						<div className={(styles.blod, styles.blod2)}></div>
					</div>
				</span>
				<p className={styles.p}>4</p>

				<div className={styles.pageMs}>
					<p className={styles.pageMsg}>
						{' '}
						Oops, the page you're looking for, Disappeared!!{' '}
					</p>
					<button className={styles.goBack} onClick={() => history.goBack()}>
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotFoundRoute;
