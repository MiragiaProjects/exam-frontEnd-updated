
const PostList = ({ data }) => {
  return (
    <div className='d-flex flex-wrap justify-content-between'>
        {data.posts.map(post => (
            <div key={post.id}>
                <p>{post.title}</p>
            </div>
        ))}

    </div>
  )
}

export default PostList