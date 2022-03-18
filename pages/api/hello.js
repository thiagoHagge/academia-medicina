// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import {parse} from 'node-html-parser';

const getUrls = async () => {
  const body = await axios.get('https://open.spotify.com/show/1GLSDdk9CDEwziGNIlnb8a')
  const dom = parse(body.data);
  var urls = []
  console.log(dom.querySelector())
  dom.querySelectorAll(".g5gZaZVzR0tGT4pK6iEU").forEach((element) => {
    urls.push(`https://open.spotify.com/${element.getAttribute('href')}`)
  })
  return urls
}

export default async function handler(req, res) {
  const urls = await getUrls()

  // var urls = getUrls()
  res.status(200).send(urls)
}
