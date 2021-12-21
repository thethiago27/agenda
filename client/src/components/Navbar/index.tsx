import styles from "./styles.module.scss";
import {session} from "../../service/session";
import {api} from "../../service/api";
import {useEffect, useState} from "react";

interface User {
    name: string;
    email: string;
}

export function Navbar() {

    const [token, setToken] = useState(session.getToken());
    const [user, setUser] = useState<User>({
        name: "",
        email: ""
    });

    useEffect(() => {

        async function userProfile() {

            const response = await api.get('/user');

            setUser(response.data);
        }

        if(token) userProfile();


    }, [token]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img className={styles.logo} src="logo.svg" alt="logo" />

                { session.getToken() && (
                    <div className={styles.profile}>
                        <div className={styles.user}>
                            <p className={styles.name}>{user.name}</p>
                            <p className={styles.email}>{user.email}</p>
                        </div>
                        <div className={styles.profileImage}>
                            <img className={styles.imageProfile} src="profile.png" alt="profile" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}