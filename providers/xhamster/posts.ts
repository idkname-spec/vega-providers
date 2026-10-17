export async function getPosts(filterValue: string, page: number = 1, { axios, cheerio }: any) {
  let url = 'https://xhamster.com/';
  if (filterValue === 'newest') {
    url = `https://xhamster.com/newest/${page}`;
  } else if (filterValue === 'best') {
    url = `https://xhamster.com/best/weekly/${page}`;
  } else {
    url = `https://xhamster.com/${page}`;
  }

  const res = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const $ = cheerio.load(res.data);
  const posts: any[] = [];

  $('.video-thumb').each((_: any, el: any) => {
    const title = $(el).find('.video-thumb-info__name').text().trim() || $(el).find('img').attr('alt');
    const link = $(el).find('a.video-thumb__image-container').attr('href') || $(el).find('a').attr('href');
    const image = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');

    if (title && link) {
      posts.push({
        title,
        link: link.startsWith('http') ? link : `https://xhamster.com${link}`,
        image: image || ''
      });
    }
  });

  return posts;
}

export async function getSearchPosts(query: string, page: number = 1, { axios, cheerio }: any) {
  const url = `https://xhamster.com/search/${encodeURIComponent(query)}?page=${page}`;
  const res = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const $ = cheerio.load(res.data);
  const posts: any[] = [];

  $('.video-thumb').each((_: any, el: any) => {
    const title = $(el).find('.video-thumb-info__name').text().trim() || $(el).find('img').attr('alt');
    const link = $(el).find('a.video-thumb__image-container').attr('href') || $(el).find('a').attr('href');
    const image = $(el).find('img').attr('src') || $(el).find('img').attr('data-src');

    if (title && link) {
      posts.push({
        title,
        link: link.startsWith('http') ? link : `https://xhamster.com${link}`,
        image: image || ''
      });
    }
  });

  return posts;
}
