import { useEffect, useState } from "react"

const useAPI = (apiFunction, triggers=[]) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        apiFunction()
            .then(response => {
                setData(response)
            })
            .catch(err => {
                if (err.response) setError(err.response.data)
                else setError({ message: "No response: Server is probably warming up. This could take up to a minute..." })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, triggers)

    return { data, setData, isLoading, error }
}

export default useAPI