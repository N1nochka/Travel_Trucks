import styles from './LoadingOverlay.module.css';

const LoadingOverlay = () => {
    return (
        <div className={styles.backdrop}>
            <div className={styles.card}>
                <div className={styles.spinner}>
                    <div className={styles.ellipse}></div>
                    <div className={styles.ellipseActive}></div>
                </div>

                <div className={styles.content}>
                    <p className={styles.title}>
                        Loading tracks...
                    </p>

                    <p className={styles.description}>
                        Please wait while we fetch the best
                        <br />
                        travel tracks for you
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;