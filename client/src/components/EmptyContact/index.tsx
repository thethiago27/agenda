import styles from "./styles.module.scss";
import {NewContactButton} from "../NewContactButton";

export function EmptyContact() {

    return (
        <div className={styles.container}>

            <img src={"list.svg"} alt="Empty list" className={styles.emptyList} />
            <div className={styles.emptyListText}>
                <p className={styles.empty}>Parece meio vazio...</p>
                <p>Que tal adicionar um novo contato?</p>
                <NewContactButton/>
            </div>
        </div>
    )

}