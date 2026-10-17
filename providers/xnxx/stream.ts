export async function getStream(link: string, type: string, { axios }: any) {
  const res = await axios.get(link);
  const html = res.data;
  const streams: any[] = [];

  const highMatch = html.match(/html5player\.setVideoUrlHigh\('([^']+)'\)/);
  const lowMatch = html.match(/html5player\.setVideoUrlLow\('([^']+)'\)/);
  const hlsMatch = html.match(/html5player\.setVideoHLS\('([^']+)'\)/);

  if (hlsMatch && hlsMatch[1]) {
    streams.push({ server: 'XNXX HLS', link: hlsMatch[1], type: 'hls' });
  }
  if (highMatch && highMatch[1]) {
    streams.push({ server: 'XNXX High (720p/1080p)', link: highMatch[1], type: 'mp4' });
  }
  if (lowMatch && lowMatch[1]) {
    streams.push({ server: 'XNXX Low (360p/480p)', link: lowMatch[1], type: 'mp4' });
  }

  return streams;
}
