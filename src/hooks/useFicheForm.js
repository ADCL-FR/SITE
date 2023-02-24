import { useState } from 'react'

const useFicheForm = (formState) => {
    const [user, setUser] = useState(formState)

    const onChangeInput = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
    }

    return {
        user,
        onChangeInput,
        onSubmitForm,
    }
}

export default useForm