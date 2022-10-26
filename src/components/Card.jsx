import styles from '../styles/Card.module.css'

export default function Card({
    title = "Title",
    body = "Lorem ipsum",
    button
}) {
    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <p>{body}</p>
            {button}
        </div>
    )
}
