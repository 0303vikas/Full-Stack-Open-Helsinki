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

const mostBlogs = (blogs) => {

//   const authorrecord = []

//   const formattemp = (value) => {
//     return {
//       author : value.author,
//     }
//   }

  const reducer = (pre, next) => {

    if(!pre) return [...pre,{ author: next.author, blogs : (pre[next.author] || 0) + 1 } ]
    else {
      if(pre.includes(next.author)){
        console.log(pre.includes(next.author))
        pre[pre.map(object => object.author).indexOf(next.author)].blogs += 1
        return pre
      }else {
        return [...pre,{ author: next.author, blogs : (pre[next.author] || 0) + 1 } ]
      }
    }
  }



  return blogs.length === 0
    ?0
    :blogs.reduce(reducer,[])



//   const reducer = (prev,current) => prev.likes > current.likes ? formattemp(prev) : formattemp(current)


}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}