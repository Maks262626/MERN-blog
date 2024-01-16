import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import s from './Article.module.scss'
import "react-loading-skeleton/dist/skeleton.css";
function ArticleSkeleton() {
    return (
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
            <div className={s.article}>
                <div className={s.left}>
                    <Skeleton style={{ width: "100%" }} height={250} />
                </div>
                <div className={s.right}>
                    <div className={s.title}>
                        <Skeleton width={200} />
                    </div>
                    <div className={s.text}>
                        <Skeleton count={6} />
                    </div>
                    <div className={s.actions}>
                        <Skeleton width={30} height={30} />
                        <Skeleton width={30} height={30} />
                        <div>
                            <Skeleton width={60} />
                        </div>
                        <div>
                            <Skeleton width={60} />
                        </div>
                        <div>
                            <Skeleton width={60} />
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
}

export default ArticleSkeleton;