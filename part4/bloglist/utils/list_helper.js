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

  // first use reducer to combine the author blogs,
  // then returning an object array, further using another reducer to find the max blogs

  const reducer = (pre, next) => {

    if(!pre) return [...pre,{ author: next.author, blogs : (pre[next.author] || 0) + 1 } ]
    else {
      if(pre.find(o => o.author === next.author)){
        pre[pre.map(object => object.author).indexOf(next.author)].blogs += 1
        return pre
      }else {
        return [...pre,{ author: next.author, blogs : (pre[next.author] || 0) + 1 } ]
      }
    }
  }



  return blogs.length === 0
    ?0
    :blogs.reduce(reducer,[]).reduce((pre,next) => pre.blogs >= next.blogs? pre:next)



//   const reducer = (prev,current) => prev.likes > current.likes ? formattemp(prev) : formattemp(current)


}

const mostLikes = (blogs) => {


  // first use reducer to combine the author blogs,
  // then returning an object array, further using another reducer to find the max blogs

  const reducer = (pre, next) => {

    if(!pre) return [...pre,{ author: next.author, likes : next.likes } ]
    else {
      if(pre.find(o => o.author === next.author)){
        pre[pre.map(object => object.author).indexOf(next.author)].likes += next.likes
        return pre
      }else {
        return [...pre,{ author: next.author, likes : next.likes } ]
      }
    }
  }
  return blogs.length === 0
    ?0
    :blogs.reduce(reducer,[]).reduce((pre,next) => pre.likes >= next.likes? pre:next)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}