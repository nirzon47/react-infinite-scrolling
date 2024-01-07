import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useRef, useState } from 'react'

const Images = () => {
	const [images, setImages] = useState([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const loaderRef = useRef(null)
	const [error, setError] = useState(false)
	const [errorText, setErrorText] = useState('')

	/**
	 * Fetches images from the Unsplash API.
	 *
	 * @return {Promise<void>} A promise that resolves when the images are fetched.
	 */
	const fetchImages = async () => {
		setLoading(true)

		try {
			const response = await axios.get(
				`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_API_KEY}&count=30&page=${page}`
			)
			const data = response.data
			setImages((prevImages) => [...prevImages, ...data])
			setPage((prevPage) => prevPage + 1)
		} catch (error) {
			setError(true)
			setErrorText(error.message)
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Loads more images by incrementing the page number and calling the fetchImages function.
	 *
	 * @param {type} paramName - description of parameter
	 * @return {type} description of return value
	 */
	const loadMoreImages = () => {
		setPage((prevPage) => prevPage + 1)
		fetchImages()
	}

	useEffect(() => {
		fetchImages()
	}, [])

	return (
		<InfiniteScroll
			dataLength={images.length}
			next={loadMoreImages}
			hasMore={!error && !loading}
			loader={
				<div className='flex justify-center items-center my-4'>
					<span
						ref={loaderRef}
						className='loading loading-dots loading-lg'
					></span>
				</div>
			}
			scrollThreshold={1.0}
		>
			<div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 pb-8'>
				{images.map((image) => {
					return (
						<img
							key={image.id}
							src={image.urls.regular}
							alt={image.description}
							className='mb-4'
						/>
					)
				})}
			</div>
			{loading && (
				<div className='flex justify-center items-center my-4'>
					<span
						ref={loaderRef}
						className='loading loading-dots loading-lg'
					></span>
				</div>
			)}
			{error && (
				<p className='text-red-400 font-bold text-xl text-center'>
					ERROR! {errorText}
				</p>
			)}
		</InfiniteScroll>
	)
}

export default Images
