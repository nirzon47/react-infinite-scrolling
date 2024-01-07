import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const Images = () => {
	const [images, setImages] = useState([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [debounce, setDebounce] = useState(null)
	const loaderRef = useRef(null)
	const [error, setError] = useState(false)
	const [errorText, setErrorText] = useState('')

	const fetchImages = async () => {
		try {
			setLoading(true)
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

	const handleScroll = () => {
		if (debounce) {
			clearTimeout(debounce)
		}

		if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
			setDebounce(
				setTimeout(() => {
					fetchImages()
				}, 500)
			)
		}
	}

	useEffect(() => {
		fetchImages()
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	return (
		<>
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
		</>
	)
}

export default Images
