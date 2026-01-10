import styles from './Button.module.css'

function Button() {
    return(
        <button className={styles.btn}>Submit</button>
    );
}

// Using composition
function ButtonTwo({ type='primary', label="Button"}) {
    return (
        <button className={styles[type]}>{label}</button>
    );
}

export { Button, ButtonTwo };