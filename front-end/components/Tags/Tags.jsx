import { Link } from 'react-router-dom';
import s from './Tags.module.scss';
function Tags({ title, tags }) {
    return (
        <div className={s.tagsWrapper}>
            <div className={s.tags__title}>{title}</div>
            <div className={s.tags}>
                {tags.items.map((tag) => {
                    return (
                        <Link
                            className={s.tag}
                            key={tag._id}
                            to={`/tags/${tag._id}`}
                        >
                            {tag.name}
                        </Link>
                    ); 
                })}
            </div>
        </div>
    );
}

export default Tags;