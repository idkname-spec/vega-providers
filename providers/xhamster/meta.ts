export async function getMeta(link: string, { axios, cheerio }: any) {
  const res = await axios.get(link, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const $ = cheerio.load(res.data);
  const title = $('meta[property="og:title"]').attr('content') || $('title').text().trim();
  const image = $('meta[property="og:image"]').attr('content') || '';
  const synopsis = $('meta[property="og:description"]').attr('content') || '';

  return { title, image, synopsis, type: 'movie', link };
}
