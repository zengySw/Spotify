import './MediaListP.css';
import { MusicCard, ArtistCard, PodcastCard, AudioBookCard } from '../../components/Cards';
import { RowList } from '../../components/Lists';

export default function MediaListP({ title, props = { likedTracks: [], likedAlbums: [], likedArtists: [], likedMixes: [], likedPodcasts: [], likedAudiobooks: [] } }) {
    return (
        <div className="media-list-p">
            <h2>{title}</h2>
            <div className="media-lists">
                {
                    props.likedTracks != null && props.likedTracks.length != 0 ? <RowList title={<h4>Улюблені треки</h4>} childs={props.likedTracks.map((likedTrack) => <MusicCard key={likedTrack.id} {...likedTrack} />)} prevCount={7 > props.likedTracks.length ? props.likedTracks.length : 7} continueLink="/liked-music" /> : null
                }
                {
                    props.likedAlbums != null && props.likedAlbums.length != 0 ? <RowList title={<h4>Плейлисти</h4>} childs={props.likedAlbums.map((likedAlbum) => <MusicCard key={likedAlbum.id} {...likedAlbum} />)} prevCount={7 > props.likedAlbums.length ? props.likedAlbums.length : 7} continueLink="/liked-albums" /> : null
                }
                {
                    props.likedArtists != null && props.likedArtists.length != 0 ? <RowList title={<h4>Твої улюблені <span style={{ color: '#40a2ff' }}>виконавці</span></h4>} childs={props.likedArtists.map((likedArtist) => <ArtistCard key={likedArtist.id} {...likedArtist} />)} prevCount={5 > props.likedArtists.length ? props.likedArtists.length : 5} continueLink="/liked-artists" /> : null
                }
                {
                    props.likedMixes != null && props.likedMixes.length != 0 ? <RowList title={<h4>Твої найкращі <span style={{ color: '#40a2ff' }}>мікси</span></h4>} childs={props.likedMixes.map((likedMix) => <MusicCard key={likedMix.id} {...likedMix} />)} prevCount={7 > props.likedMixes.length ? props.likedMixes.length : 7} continueLink="/liked-mixes" /> : null
                }
                {
                    props.likedPodcasts != null && props.likedPodcasts.length != 0 ? <RowList title={<h4><span style={{ color: '#40a2ff' }}>Подкасти</span> які тобі сподобались</h4>} childs={props.likedPodcasts.map((likedPodcast) => <PodcastCard key={likedPodcast.id} {...likedPodcast} />)} prevCount={4 > props.likedPodcasts.length ? props.likedPodcasts.length : 4} /> : null
                }
                {
                    props.likedAudiobooks != null && props.likedAudiobooks.length != 0 ? <RowList title={<h4><span style={{ color: '#40a2ff' }}>Аудіокниги</span> які тобі сподобались</h4>} childs={props.likedAudiobooks.map((likedAudiobook) => <AudioBookCard key={likedAudiobook.id} {...likedAudiobook} />)} prevCount={7 > props.likedAudiobooks.length ? props.likedAudiobooks.length : 7} flexDirection="column" /> : null
                }
            </div>
        </div>
    );
}