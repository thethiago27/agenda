import styles from "./styles.module.scss"
import {api} from "../../service/api";
import { useRouter } from "next/router";

interface ContactListProps {
    contacts: Contact[];
}

type Contact = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
}

export function ContactList({contacts}: ContactListProps) {

    const router = useRouter();

    async function deleteContact(id: string) {

        try {
            const response = await api.delete(`/contact/${id}`);

            const { status } = response.data

            if (status) router.reload()

        } catch (e) {

        }

    }

    return (
        <>
            {contacts.map(contact => (
                <div key={contact._id} className={styles.box}>
                    <div className={styles.infos}>
                        <img src={contact.image} alt=""/>
                        <div className={styles.base}>
                            <p>{contact.name}</p>
                            <p>{contact.phone}</p>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button onClick={() => deleteContact(contact._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    );
}