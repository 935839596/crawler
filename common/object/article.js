export default class article{
  constructor({title, url, time, author, tag}){
    this.title =  title
    this.url =url
    this.time = time
    this.author = author
    this.tag = tag
  }
}

export function createArticle(article){
  return new article({
    title: article.title,
    url: article.url,
    time: article.time,
    author: article.author,
    tag: article.tag
  })
}