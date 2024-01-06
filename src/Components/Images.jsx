import axios from 'axios'

const Images = () => {
	const fetchImages = () => {
		const data = axios.get(
			`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_API_KEY}&count=30`
		)
		console.log(data)
	}

	fetchImages()

	return <div>Images</div>
}

export default Images
