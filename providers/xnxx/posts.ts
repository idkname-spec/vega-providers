export async function getPosts(filterValue: string, page: number = 1, { axios, cheerio }: any) {
  let url = 'https://www.xnxx.com/';
  if (filterValue === 'top') {
    url = `https://www.xnxx.com/best/${page}`;
  } else if (filterValue === 'hot') {
    url = `https://www.xnxx.com/hot/${page}`;
  } else {
    url = `https://www.xnxx.com/new/${page}`;
  }

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const posts: any[] = [];

  $('.mozaique .thumb-block').each((_: any, el: any) => {
    const title = $(el).find('.p-title a').attr('title') || $(el).find('.p-title a').text().trim();
    const link = $(el).find('.p-title a').attr('href');
    const image = $(el).find('.thumb img').attr('data-src') || $(el).find('.thumb img').attr('src');
    if (title && link) {
      posts.push({
        title,
        link: link.startsWith('http') ? link : `https://www.xnxx.com${link}`,
        image: image || ''
      });
    }
  });

  return posts;
}

export async function getSearchPosts(query: string, page: number = 1, { axios, cheerio }: any) {
  const url = `https://www.xnxx.com/search/${encodeURIComponent(query)}/${page}`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const posts: any[] = [];

  $('.mozaique .thumb-block').each((_: any, el: any) => {
    const title = $(el).find('.p-title a').attr('title') || $(el).find('.p-title a').text().trim();
    const link = $(el).find('.p-title a').attr('href');
    const image = $(el).find('.thumb img').attr('data-src') || $(el).find('.thumb img').attr('src');
    if (title && link) {
      posts.push({
        title,
        link: link.startsWith('http') ? link : `https://www.xnxx.com${link}`,
        image: image || ''
      });
    }
  });

  return posts;
}
