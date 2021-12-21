import styles from "./styles.module.scss"
import {Layout} from "../../components/Layout";
import {useEffect, useState} from "react";
import {session} from "../../service/session";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {EmptyContact} from "../../components/EmptyContact";
import {api} from "../../service/api";
import {NewContactButton} from "../../components/NewContactButton";
import {ContactList} from "../../components/ContactList";

interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export default function Dashboard() {

    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        if (!session.getToken()) router.push('/');

        async function getContacts() {
            const response = await api.get('/contact');

            const { data } = response.data

            setContacts(data);
        }

        getContacts();

    }, [])

    return (
        <Layout>
            {contacts.length > 0 ? (
                <div className={styles.container}>
                    <div className={styles.row}>
                        <p>Contatos: <span>{contacts.length}</span></p>
                        <NewContactButton/>
                    </div>
                    <ContactList contacts={contacts}/>
                </div>
            ) : (
                <EmptyContact/>
            )}

        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    

    return {
        props: {},
    }
}