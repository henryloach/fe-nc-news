import { useEffect, useState } from "react";

const useCreateResource = apiFunction => {
    console.log("fromHook")
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiFunction()
            .then(data => {
                setData(data)
            })
            .catch(err => {
                setError(err.response.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return { data, isLoading, error }
}

export default useCreateResource