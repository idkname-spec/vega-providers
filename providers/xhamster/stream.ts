export async function getStream(link: string, type: string, { axios }: any) {
  const res = await axios.get(link, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = res.data;
  const streams: any[] = [];

  const match = html.match(/window\.initials\s*=\s*({.*?});/s);
  if (match && match[1]) {
    try {
      const data = JSON.parse(match[1]);
      const formatModel = data?.xplayerSettings?.sources?.standard || data?.videoModel?.sources?.standard;
      if (formatModel) {
        if (formatModel.hls) {
          const hlsUrl = formatModel.hls.all || formatModel.hls['720p'];
          if (hlsUrl) streams.push({ server: 'xHamster HLS', link: hlsUrl, type: 'hls' });
        }
        if (formatModel.mp4) {
          Object.keys(formatModel.mp4).forEach((quality) => {
            streams.push({ server: `xHamster MP4 (${quality})`, link: formatModel.mp4[quality], type: 'mp4' });
          });
        }
      }
    } catch (e) {}
  }

  if (streams.length === 0) {
    const mp4Matches = [...html.matchAll(/"(https:\/\/[^"]+\.mp4[^"]*)"/g)];
    mp4Matches.slice(0, 3).forEach((m, idx) => {
      streams.push({ server: `xHamster Direct ${idx + 1}`, link: m[1].replace(/\\/g, ''), type: 'mp4' });
    });
  }

  return streams;
}
