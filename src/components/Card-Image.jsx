import { usePhotoApi } from "../hooks/usePhotosApi"
import { IoMdHeartEmpty } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import '../styles/CardImage.css'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addFavourites, removeFavourites } from "../reducers/favouriteSlice";
import { FaFaceGrinBeamSweat } from "react-icons/fa6";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";


export default function CardImage() {

    const dispatch = useDispatch();
    const { photos } = usePhotoApi();
    const favourites = useSelector((state) => state.favourites.favourites)
    const showFavourites = useSelector((state) => state.favourites.showFavourites)
    const [order, setOrder] = useState('')

    const addFavouritesFunction = (photo) => {
        dispatch(addFavourites(photo))
        toast.success("Photo added successfully", { autoClose: 1500, theme: "dark", position: "bottom-right", transition: Slide });
    }

    const removeFavouritesFunction = (photo) => {
        dispatch(removeFavourites(photo))
        toast.error('Photo deleted successfully', { autoClose: 1500, theme: 'dark', position: "bottom-right", transition: Slide })
    }

    const handleChangeOrder = (e) => {
        setOrder(e.target.value)
    }

    const orderPhotos = (photos) => {
        if (order === 'width') {
            return [...photos].sort((a, b) => b.width - a.width)
        } else if (order === 'height') {
            return [...photos].sort((a, b) => b.height - a.height)
        } else if (order === 'likes') {
            return [...photos].sort((a, b) => b.likes - a.likes)
        } else if (order === 'date') {
            return [...photos].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }
        console.log(photos)

        return [...photos]
    }


    return (
        <>
            <div className="card-content">
                <div className='card__select'>
                    <select name="order" id="order" onChange={handleChangeOrder}>
                        <option value="">Order by</option>
                        <option value="width">Width</option>
                        <option value="height">Height</option>
                        <option value="likes">Likes</option>
                        <option value="date">Date</option>
                    </select>
                </div>
                {showFavourites ?
                    favourites.length === 0 ?
                        (<div className="card-favourites">
                            <h1 className="title">You still do not have favourite images <FaFaceGrinBeamSweat />
                            </h1>
                        </div>)
                        : (
                            orderPhotos(favourites).map((photo) => (<div className="card-image" key={photo.id}>
                                <div className="card-image-content" >
                                    <img src={photo.urls.small_s3} alt={photo.alt_description} />
                                    <div className="card-buttons">
                                        <FiDownload className="download" />
                                        <MdDeleteOutline className="delete" onClick={() => removeFavouritesFunction(photo)} />
                                    </div>
                                </div>
                            </div>))
                        )
                    : orderPhotos(photos).map((photo) => (
                        <div className="card-image" key={photo.id}>
                            <div className="card-image-content" >
                                <img src={photo.urls.small_s3} alt={photo.alt_description} />
                                <div className="card-buttons">
                                    <FiDownload className="download" />
                                    <IoMdHeartEmpty className="heart" onClick={() => addFavouritesFunction(photo)} />
                                </div>
                            </div>
                        </div>
                    ))}
                <ToastContainer limit={2} />
            </div>
        </>


    )
}
