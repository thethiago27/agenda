import styles from "./styles.module.scss"
import Modal from 'react-modal';
import {useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {api} from "../../service/api";
import {useRouter} from "next/router";
import { base64Encode } from "../../service/base64Encode";

type Contact = {
    name: string,
    email: string,
    phone: string,
    birthday: string,
    street: string,
    city: string,
    neighborhood: string,
    number: string,
    image: string
}

export function NewContactButton() {

    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState("")

    const [image, setImage] = useState("")

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    const { register, handleSubmit, formState: { errors } } = useForm<Contact>();

    const router = useRouter()

    const onSubmit: SubmitHandler<Contact> = async (data) => {

        try {

            data.image = image
            const response = await api.post('/contact', data)

            const { status } = response.data

            if (!status) setError("Erro ao cadastrar contato")

            router.reload()
        } catch (error) {
            setError("Erro ao cadastrar contato")
        }

    }

    async function handleImage(e: any) {
        const base64 = await base64Encode(e.target.files[0])
        setImage(base64)

        console.log(base64)
    }

    return (
        <>
            <button onClick={() => openModal()} className={styles.button}>
                Criar contato
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Criar contato"
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <p>Criar novo contato</p>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <input {...register("name")} placeholder="Nome" type="text"/>
                    <input {...register("email")} placeholder="E-mail" type="text"/>
                    <input {...register("phone")} placeholder="Numero" type="text"/>
                    <input {...register("birthday")}  placeholder="Data de nascimento" type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
                    <input {...register("street")}  placeholder="Rua" type="text"/>
                    <input {...register("number")}  placeholder="Numero" type="text"/>
                    <input {...register("neighborhood")}  placeholder="Bairro" type="text"/>
                    <input {...register("city")}  placeholder="Cidade" type="text"/>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleImage} />

                    <button type="submit">
                        Salvar
                    </button>
                </form>
            </Modal>
        </>

    )
}