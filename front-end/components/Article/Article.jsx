import { Link } from 'react-router-dom';
import s from './Article.module.scss';
function Article({ article }) {
    return (
        <Link className={s.article} to={`/posts/${article._id}`}>
            {article.imageUrl && (
                <div className={s.left}>
                    <img
                        src={`${article.imageUrl}`}
                        alt=""
                    />
                </div>
            )}

            <div className={s.right}>
                {article.tags && (
                    <div className={s.tags}>
                        {article.tags.map((tag, index) => (
                            <div className={s.tag} key={index}>
                                {tag.name}
                            </div>
                        ))}
                    </div>
                )}
                <div className={s.title}>
                    {article.title.length > 50
                        ? `${article.title.slice(0, 50)}...`
                        : article.title}
                </div>
                <div
                    className={s.text}
                    dangerouslySetInnerHTML={{
                        __html: `${
                            article.text.length > 200
                                ? `${article.text.slice(0, 200)}...`
                                : article.text
                        }`,
                    }}
                />
                <div className={s.user}>
                    {article.user.avatarUrl ? (
                        <img
                            src={article.user.avatarUrl}
                            alt=""
                        />
                    ) : (
                        <img src={"https://placehold.co/50x50"} alt="" />
                    )}
                    <div className={s.name}>{article.user.fullname}</div>
                </div>
                <div className={s.actions}>
                    <div>
                        <span>{article.viewsCount}</span> views
                    </div>
                    <div>
                        <span>{article.likes}</span> likes
                    </div>
                    <div>{article.createdAt.slice(0, 10)}</div>
                </div>
            </div>
        </Link>
    );
}

export default Article;
