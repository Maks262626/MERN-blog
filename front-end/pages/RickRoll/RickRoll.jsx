import { useEffect, useState } from "react";
import s from "./FullPost.module.scss";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
function RickRoll() {
    const fakeArticle = {
        imageUrl:
            "http://res.cloudinary.com/dybr6b4gf/image/upload/s--ExHFta4N--/v1705414724/blog/wwhgnlehbghtitm9dctu.jpg",
        title: "NEW FUNCTION",
        text: "text",
        user: { avatarUrl: "http://res.cloudinary.com/dybr6b4gf/image/upload/s--ExHFta4N--/v1705414724/blog/wwhgnlehbghtitm9dctu.jpg",fullname:"Biden Joe" },
        createdAt: "25-01-2024",
        viewsCount: 101,
        likes: 1,
    };
    const [weAreReady, setWeAreReady] = useState(false);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setWeAreReady(true);
        }, 3000);
        ()=>{clearInterval(timerId)}
    },[])
    return (
        <div className={s.fullpost}>
            <div className={s.container}>
                <div className={s.fullpost__inner}>
                    <div className={s.fullpost__image}>
                        {weAreReady ? (
                            <video autoPlay className={s.fullpost__image}>
                                <source src="/rick.mp4" type="video/mp4" />
                            </video>
                        ) : (
                            <img src={`${fakeArticle.imageUrl}`} alt="" />
                        )}
                    </div>
                    <div className={s.actions}>
                        <div className={s.action}>
                            <FaRegHeart
                                className={`iconBtn iconBtn_m ${s.like}`}
                            />
                            <span>{fakeArticle.likes}</span>
                        </div>
                        <div className={s.action}>
                            <FaRegCommentDots
                                className={`iconBtn iconBtn_m ${s.bookmark}`}
                            />
                            <span>0</span>
                        </div>
                        <div className={s.action}>
                            <MdOutlineRemoveRedEye
                                className={`iconBtn iconBtn_m`}
                            />
                            <span>{fakeArticle.viewsCount}</span>
                        </div>
                    </div>
                    <div className={s.user}>
                        <img src={`${fakeArticle.user.avatarUrl}`} alt="" />
                        <div className={s.name}>
                            {fakeArticle.user.fullname}
                        </div>
                    </div>
                    <div className={s.title}>{fakeArticle.title}</div>
                    <div className={s.content}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, repudiandae ad? Iste adipisci quisquam nisi fuga exercitationem qui! Consequuntur minima praesentium architecto quam. Molestias ab iusto voluptatem dolor sit minus!
                        Dolore nesciunt, distinctio ad ipsa natus in quisquam hic ea minus dicta beatae facere, libero nulla corrupti corporis aliquam ab at sapiente, qui vitae veritatis ex praesentium rem labore. Autem.
                        Rem ex numquam sed dolores fugiat, quaerat nemo alias dolor. Enim laboriosam officiis fugiat nisi illum? Nobis a sunt laboriosam odit exercitationem consequatur corrupti eius doloribus, necessitatibus excepturi id maiores!
                        Consectetur eligendi totam modi inventore nesciunt ducimus ad ut laboriosam accusantium, maxime harum ullam consequatur vero, voluptate doloremque architecto. Consectetur pariatur rerum laudantium corporis, quasi quae est ducimus enim temporibus.
                        Ipsa voluptate veritatis, hic ducimus excepturi ut accusamus quis eum delectus quasi! Illum neque modi necessitatibus amet perferendis molestiae fugit eius, ducimus aut voluptatibus eveniet eaque enim cupiditate laborum libero!
                        Vero esse quidem voluptatum nesciunt. Magni impedit accusamus neque eaque explicabo dolorum? Optio quia fugiat sed, adipisci nesciunt illum odio quaerat atque natus ex aspernatur repudiandae unde ipsa rerum aliquam?
                        Soluta placeat rerum totam enim quidem aliquid cumque nostrum debitis nulla eaque a odio tempore dolorem molestias accusantium, accusamus dolorum ut omnis, doloribus, saepe nobis. Quam animi atque voluptatum impedit.
                        Asperiores voluptatem labore magnam, repellendus provident accusamus veritatis cum voluptatum, odit esse autem dicta illum commodi quod, aliquid sequi officia a vitae? Iure temporibus cum quis accusantium. Repellat, vero dolorum.
                        Dolorem consectetur nihil labore minus molestias voluptas laudantium nemo odit eveniet recusandae laborum odio, veniam neque autem sint minima saepe reprehenderit obcaecati temporibus. Natus voluptates molestiae facilis ratione quaerat repellendus!
                        Deserunt rem facere maiores ad voluptatem laborum quasi voluptas debitis nobis esse molestias minima, at dolores dolor quis. Facere voluptatibus ducimus numquam deleniti officiis perspiciatis voluptatem optio saepe nihil dignissimos!
                        Maiores quisquam eos magnam magni suscipit provident. Eius adipisci beatae asperiores reprehenderit expedita vitae vel placeat atque ad accusantium reiciendis voluptatum modi natus, odit sit voluptatibus, veniam libero, tenetur laboriosam!
                        Nulla dolores tenetur velit, reprehenderit vel modi ipsum voluptas ex vitae a quam esse, eaque numquam error, eligendi officiis nihil praesentium explicabo autem illum distinctio. Illo dolorem odio alias magnam.
                        Repudiandae assumenda quis illum! Ipsam assumenda, in repudiandae amet dolorem aperiam nam voluptatum quaerat eligendi tenetur eum asperiores fugit ab minus numquam eaque! Ratione provident illo aspernatur illum accusantium enim.
                        Assumenda, magnam quo eos excepturi maxime blanditiis omnis suscipit deserunt quibusdam laboriosam tenetur cum quasi quaerat fugiat ullam explicabo pariatur laudantium reiciendis? Doloremque iste natus laboriosam odio quidem officia ratione?
                        Saepe veritatis eveniet distinctio explicabo illum praesentium excepturi consequuntur, quod ducimus non sed delectus id pariatur fuga voluptatibus animi at laborum officiis eius similique repellendus quaerat dicta mollitia error! Ex.
                        Fugit repellendus maiores sint perferendis omnis dolor illo at mollitia nemo, itaque tempora, nulla vel velit non, officiis magni voluptate aperiam reiciendis corrupti? Dolore porro mollitia tenetur, ad velit ratione.
                        Voluptas eaque cupiditate sunt dolore debitis! Quo fugit, numquam eveniet nam totam odio libero? Veritatis minus tempora quam eum, necessitatibus iusto nam non sint architecto eaque? Ipsam quidem voluptate distinctio!
                        Deleniti odit consectetur a ullam modi velit error eligendi eos quaerat provident? Dignissimos tenetur iste cum ipsam fuga consequuntur a, mollitia blanditiis impedit magnam, neque animi numquam. Veniam, nihil rem.
                        Dolorem voluptas aut ipsum perferendis, consequatur provident praesentium animi corporis ab nisi quod expedita adipisci maxime fugit, sunt quisquam numquam harum mollitia, excepturi natus qui. Magnam ipsam temporibus maxime ratione!
                        Corporis libero blanditiis accusantium culpa ipsum. Dicta accusamus reprehenderit a temporibus deserunt eaque dolorum totam ut nulla quasi, saepe culpa cum praesentium minus fugiat aliquid! Neque, laudantium ratione. Nostrum, cupiditate.
                        Officiis culpa ipsam voluptates quos, molestias id asperiores sed repudiandae alias nesciunt nobis modi voluptas natus adipisci repellendus minus repellat odio neque quaerat eos iure, minima facere commodi molestiae. Corrupti.
                        Soluta voluptate dicta aut id nobis nesciunt amet. Omnis, itaque eveniet ipsa repellendus fugit enim magni sit provident totam doloribus. Exercitationem iure tempora maiores inventore nulla accusantium. Vero, aliquam corrupti.
                        Quo hic consequuntur quis et! Saepe dolorem cum magni quidem quasi placeat porro fugiat tempora, expedita nobis autem inventore sequi distinctio tenetur eos sunt quos neque, sint et, itaque ratione.
                        Sequi qui voluptatum voluptas, ab rerum quae vero beatae! Impedit quibusdam quisquam magnam minus at, maxime optio molestiae voluptatem iste quia quidem quasi ullam, error fugiat excepturi soluta. Assumenda, vel!
                        Esse quo veritatis debitis et laudantium magnam consequuntur blanditiis ipsam quaerat impedit similique molestiae nam aliquid voluptates repudiandae ex cum facere magni tenetur, deserunt deleniti laboriosam! Porro vel obcaecati quasi?
                        Magni natus quae minus! Accusantium eius recusandae dolore blanditiis laudantium laborum assumenda repudiandae minus animi commodi? Eveniet autem voluptatum odio, exercitationem ea inventore similique. Iure similique odit eveniet blanditiis harum.
                        Harum doloribus dolorem similique molestiae atque quod neque assumenda in fuga corporis eius beatae est corrupti, minus iste quam sed ut tempore, a quae vitae quo laudantium! Possimus, inventore sint.
                        Delectus debitis ducimus suscipit deserunt dolore ratione a. A saepe aperiam, quis doloribus voluptatibus dolores magni harum eos suscipit dolorum aspernatur nihil at nam necessitatibus autem? Sunt doloremque illum amet.
                        Eum autem explicabo ipsam laboriosam reprehenderit optio aliquid. Cumque inventore fugit amet tempora natus cum. Libero quo dolorum maxime sit sapiente omnis aspernatur, maiores provident amet asperiores dolores porro impedit.
                        Eius explicabo sed nulla impedit, fugiat possimus et non ipsam aliquam veritatis nostrum corporis eos sit optio hic at rem rerum natus dolore vitae ducimus unde perferendis ut ea. Laborum.
                        Impedit, cum similique. Quo, consequuntur! At voluptatum omnis voluptates libero veritatis tempore porro provident quos, neque ea quo numquam reprehenderit, error nulla suscipit laborum aut veniam ut esse saepe dicta!
                        Debitis eligendi cupiditate doloribus laudantium sequi voluptatum sapiente repellat voluptatibus vero quia possimus perferendis suscipit temporibus non, aspernatur beatae exercitationem rem dolorem, tempore accusantium fuga in iste eius! Sed, quibusdam.
                        Suscipit perspiciatis eligendi exercitationem inventore. Doloribus sunt laudantium a, pariatur assumenda ipsam quae odio aut, dolore ea totam non. Optio harum debitis quisquam fugiat repellendus placeat officia nihil facilis dolorem!
                        Itaque ipsum quisquam beatae porro. Porro sint, perferendis corporis fugit cupiditate quaerat? Temporibus nisi facere dolorem assumenda eius natus, deserunt quas quia voluptate debitis repudiandae reprehenderit? Qui officia modi mollitia?
                        Fugit quaerat alias repudiandae nulla, voluptatibus recusandae autem maxime nemo minima dolorum amet ullam deserunt non ea esse ipsam laboriosam earum ratione atque sapiente quia? Autem ipsa quis id impedit?
                        Exercitationem magni adipisci fuga at eum voluptatem illo molestias sequi quisquam vero nesciunt vel nihil cumque, ratione, cum cupiditate sit. Doloribus tenetur ut deleniti dignissimos asperiores voluptatibus ipsum, fugiat recusandae.
                        In tempore dignissimos, dolores, nam odit accusamus totam adipisci, aliquid pariatur quos modi. Autem, dolorem! Illo ab fuga reiciendis unde deserunt rerum harum possimus! Dolore iste omnis eligendi molestias facere!
                        Repellat natus illo ex delectus incidunt placeat corrupti in amet, facere nemo sequi enim asperiores velit obcaecati, sint adipisci sapiente, eius quas iste odio harum eligendi vitae dolor. Aut, at?
                        Aliquid placeat quo, labore nostrum accusantium maiores in culpa vero minus, dolores reiciendis molestias doloribus, quasi accusamus voluptate debitis molestiae officiis. Ea dolores quia accusamus similique nihil odio voluptatem? Labore!
                        Nemo iusto ex quos delectus esse tempora et maxime earum, sapiente quam nesciunt facere quo minus ullam. A, perspiciatis doloribus. Omnis, deleniti laudantium. Deleniti voluptatem quod laborum odit repudiandae nulla.
                        Itaque necessitatibus quia repellendus voluptas? Suscipit in fugit hic incidunt, repellendus nemo a assumenda voluptate aliquid doloremque. Cumque saepe aperiam sit ratione. Enim, pariatur voluptates animi magni quas illum velit.
                        Corporis voluptates amet laboriosam, eaque commodi repellendus nihil odio quas cum labore voluptatum inventore asperiores possimus provident et quisquam iste ut culpa eius adipisci corrupti optio! Neque omnis quod non!
                        Perferendis reprehenderit, odit iste debitis facilis inventore nihil fuga, hic, doloremque quos laudantium consequuntur. Aperiam quas at mollitia corrupti commodi, perspiciatis non ut, error saepe labore doloribus, aspernatur rem praesentium!
                        A amet, doloremque laborum vero laboriosam autem! Non asperiores obcaecati molestias recusandae, illum deserunt voluptatem error a voluptatum dolor blanditiis, aliquam reprehenderit corporis! In deleniti eius facilis, ab consequatur rem.
                        Quibusdam expedita distinctio ipsam tempore cumque beatae voluptate et amet aut temporibus ea, reiciendis perspiciatis facilis, sapiente veniam incidunt fugiat quasi. Reiciendis voluptatibus vitae illum numquam facere, adipisci molestias ullam.
                        Et reiciendis odio id aliquam, amet eius eaque quam qui recusandae, nesciunt, sed dolores ipsum dicta. Voluptatum, modi minus, maxime eveniet est numquam nemo velit id molestiae corporis nostrum quae.
                        Aspernatur fuga dolores, quasi, tenetur accusantium accusamus error debitis, pariatur vero repudiandae illum sit possimus nostrum animi sed dolor corrupti dicta ipsa praesentium id! Aliquid ipsa magni blanditiis nam! Dolore.
                        Harum voluptatem nobis inventore. Aperiam aliquid odio repellat, nihil totam vel reiciendis asperiores est facilis ea omnis dicta doloribus enim doloremque tempore a nisi praesentium non dolorum saepe necessitatibus vitae.
                        Provident temporibus recusandae in pariatur maxime architecto animi, esse explicabo quae labore veritatis totam a perferendis? Modi adipisci vitae, beatae dicta, dignissimos ducimus deleniti placeat repellendus incidunt, amet expedita et.
                        Aspernatur atque vitae temporibus impedit beatae nam sed perspiciatis labore quasi earum, ad maxime, itaque molestiae. Magni omnis pariatur et non quibusdam quas impedit, fugit quasi consequatur nulla ratione reiciendis!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RickRoll;