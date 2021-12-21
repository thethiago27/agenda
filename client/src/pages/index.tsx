import styles from "../styles/Home.module.scss"
import { Layout } from "../components/Layout";
import {FormEvent, useEffect, useState} from "react";
import {api} from "../service/api";
import {session} from "../service/session";
import {useRouter} from "next/router";

export default function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (session.getToken()) router.push('/dashboard');

    }, [])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!email || !password) {
            setError("Preencha todos os campos");
            return;
        }

        try {

            const response = await api.post("/login", { email, password });

            const { token, status } = response.data;

            if (!status) return setError("Usuário ou senha inválidos");

            session.setToken(token);

            await router.push("/dashboard");

        } catch (e) {
            setError("Erro ao fazer login");
        }
    }

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.welcome}>
                    <p>Bem vindo</p>
                    <p>faça login para continuar.</p>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        type="text"
                        placeholder="Usuário"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        type="password"
                        placeholder="Senha"
                    />
                    <button className={styles.button}>Entrar</button>
                </form>
            </div>
        </Layout>
    )
}
