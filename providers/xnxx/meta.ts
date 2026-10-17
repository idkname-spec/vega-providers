export async function getMeta(link: string, { axios, cheerio }: any) {
  const res = await axios.get(link);
  const $ = cheerio.load(res.data);
  const title = $('meta[property="og:title"]').attr('content') || $('title').text().trim();
  const image = $('meta[property="og:image"]').attr('content') || '';
  const synopsis = $('meta[property="og:description"]').attr('content') || '';

  return {
    title,
    image,
    synopsis,
    type: 'movie',
    link
  };
}
