import './MediaListP.css';
import { MusicCard } from '../../../Cards';
import { RowList } from '../../../Lists';

export default function MediaListP({ title, props }) {
    return (
        <div className="media-list-p">
            <h2>{title}</h2>
            {
                props.likedTracks ? <RowList title={title} items={props.liked} renderItem={(item) => <MusicCard key={item.id} {...item} />} /> : null
            }
        </div>
    );
}