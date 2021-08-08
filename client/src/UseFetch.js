import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = url => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...')
        setData(null);
        setError(null);
        const source = axios.CancelToken.source();
        setTimeout(() => {
            axios.get(url, { cancelToken: source.token })
                .then(res => {
                    setLoading(false);
                    res.data.content && setData(res.data.content);
                    res.conent && setData(res.content);
                })
                .catch(err => {
                    setLoading(false)
                    setError('An error occured. Awkward..')
                })
        }, 1000)
        return () => {
            source.cancel();
        }
    }, [url])

    return { data, loading, error }
}

export default useFetch;