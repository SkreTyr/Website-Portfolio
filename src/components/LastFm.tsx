import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Track {
  name: string;
  artist: { '#text': string };
  album: { '#text': string };
  image: { size: string; '#text': string }[];
  url: string;
  nowplaying?: boolean;
}

const USERNAME = 'SkreTyr';

export default function LastFm() {
  const [track, setTrack] = useState<Track | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    if (!apiKey) {
      setStatus('error');
      return;
    }
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${apiKey}&format=json&limit=1`
    )
      .then((res) => res.json())
      .then((data) => {
        const t = data?.recenttracks?.track?.[0];
        if (t) {
          setTrack(t);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  const cover = track?.image?.length
    ? track.image[track.image.length - 1]?.['#text'] ?? ''
    : '';

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-full max-w-sm lg:max-w-md min-h-[9rem] rounded-md border border-[#ffffff4d] bg-[#151515] p-6 flex flex-col items-center justify-center gap-3">
        {status === 'loading' && (
          <span className="text-[#ffffff4d] font-mono text-sm">Loading...</span>
        )}
        {status === 'error' && (
          <span className="text-[#ffffff4d] font-mono text-sm">No recent tracks</span>
        )}
        {status === 'ready' && track && (
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-2">
              {cover && (
                <img
                  src={cover}
                  alt={track.album['#text']}
                  className="w-28 h-28 rounded-md object-cover"
                />
              )}
              <span className="text-[#ffffff4d] font-mono text-xs">
                {track.nowplaying ? 'Now Playing' : 'Last Played'}
              </span>
            </div>
            <div className="flex flex-col text-left gap-1">
              <span className="text-white font-mono text-sm">{track.name}</span>
              <span className="text-[#d0d0d0] font-mono text-sm">
                {track.artist['#text']}
              </span>
              <span className="text-[#ffffff4d] font-mono text-xs">
                {track.album['#text']}
              </span>
            </div>
          </div>
        )}
      </div>
      <a
        href={`https://www.last.fm/user/${USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className='group self-start inline-flex items-center gap-1 text-gray-300 hover:text-blue-600 relative text-sm after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-all after:duration-300 hover:after:w-full font-mono'
      >
        View on Last.fm
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}