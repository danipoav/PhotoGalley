import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export const usePhotoApi = () => {

    const [photos, setPhotos] = useState([]);
    const searchInput = useSelector((state) => state.search.searchInput)

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await fetch(searchInput === '' ?
                    'https://api.unsplash.com/photos?page=5&per_page=10' :
                    `https://api.unsplash.com/search/photos?page=1&query=${searchInput}`, {
                    headers: {
                        Authorization: 'Client-ID blEtcMRJy0-RpgKUbivXjtGN-mRALcjsOqYP3J-dvbo'
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener las fotos')
                }
                const data = await response.json();
                const photos = searchInput === '' ? data : data.results;
                setPhotos(photos);
                console.log(data)
            } catch (error) {
                console.log('Error: ', error)
            }
        }
        fetchApi();
    }, [searchInput])

    return { photos }
}