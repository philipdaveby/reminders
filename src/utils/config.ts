const config = {
    backend_url: process.env.NODE_ENV === 'production' ? 'https://pure-shelf-04149.herokuapp.com' : 'http://localhost:8000'
}

export default config;