const config = {
    backend_url: process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://pure-shelf-04149.herokuapp.com'
}

export default config;