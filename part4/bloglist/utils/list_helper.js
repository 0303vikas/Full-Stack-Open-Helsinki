const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes

  return blogs.length === 0
    ?0
    : blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {

  const formattemp = (list) => {
    return {
      title: list.title,
      author: list.author,
      likes: list.likes,
    }
  }


  const reducer = (prev,current) => prev.likes > current.likes ? formattemp(prev) : formattemp(current)

  return blogs.length === 0
    ?0
    : blogs.reduce(reducer)
}

// const mostBlogs = (blogs) => {

//   const authorrecord = []

//   const formattemp = (value) => {
//     return {
//       author : value.author,
//       blogs: 0,
//     }
//   }

//   blogs.map(value => {
//     value.author.find(authorrecord)? 
//   })



// //   const reducer = (prev,current) => prev.likes > current.likes ? formattemp(prev) : formattemp(current)


// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}