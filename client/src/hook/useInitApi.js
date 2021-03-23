import { useCallback, useEffect, useState } from "react"

export default (apiFn) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const loadData = useCallback(async () => {
        setIsLoading(true);

        try {
            const data = await (Array.isArray(apiFn) ? Promise.all(apiFn.map(fn => fn())) : apiFn())
            setData(data)
        } catch (e) {
            console.error(e)
            setError(e)
        }

        setIsLoading(false);
    }, [apiFn])

    useEffect(() => {
        loadData()
    }, [loadData])


    return { data, error, isLoading, reload: loadData }
}