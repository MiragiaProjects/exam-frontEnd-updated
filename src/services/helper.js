import axios from 'axios'

axios.defaults.baseURL = 'https://www.miragia-project.se/wp-json/wp/v2/'

const get = async (endpoint) => {
    const response = await axios.get(endpoint)
    
    return response.data
}

// Get posts
export const getPosts = () => {
    return get(`posts/?_embed`)
}

export const getPost = (id) => {
    return get(`posts/${id}?_embed`)
}

// Get Products
export const getProducts = () => {
    return get(`products/?_embed`)
}

// Get a specific product
export const getProduct = (id) => {
    return get(`products/${id}?_embed`)
}

// Get 4 products
export const getFourProducts = () => {
    return get(`products/?_embed`)
}

// Get 4 posts
export const getFourPosts = () => {
    return get(`posts/?_embed`)
}

// Get Menu
export const getMenu = () => {
    return get(`menu/?_embed`)
}

// Get info

export const getInfo = () => {
    return get(`info/?_embed`)
}

