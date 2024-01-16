import s from "./AddPost.module.scss";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { isAuthSelector } from "../../redux/auth";
import { Navigate, useNavigate } from "react-router-dom";
import instance from "../../axios";
function AddPost() {
    const isAuth = useSelector(isAuthSelector);
    const [selectedTags, setSelectedTags] = useState([]);
    const [value, setValue] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const { tags } = useSelector(state => state.article);
    const navigate = useNavigate();
    const inputRef = useRef();
    if (!isAuth) {
        return <Navigate to="/" />;
    }

    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions);
    };
    const handleImage = async(e) => {
        try {
            const formatData = new FormData();
            const file = e.target.files[0];
            formatData.append("image", file);
            const { data } = await instance.post("/upload", formatData);
            // const base64String = btoa(String.fromCharCode(...new Uint8Array(data.image.data.data)));
            // const imgUrl = `data:${data.image.contentType};base64,${base64String}`;
            console.log(data);
            setImageUrl(data.data.image);
        } catch (err) {
            console.warn(err);
            alert("failed to load img to cloud");
        }        
    }
   

    const handlePublish = async () => {
        try {
            const tags = selectedTags.map(el => el.id); 
            const articleData = {
                title,
                text: value,
                tags,
                imageUrl,
            }
            console.log(selectedTags);
            console.log(articleData);
            const {data} = await instance.post('/posts', articleData);
            navigate(`/posts/${data._id}`); 
            console.log(data);
            
        } catch (err) {
            console.warn(err);
        }
    };
    const root = document.querySelector(":root");
    const style = getComputedStyle(root);

    const bgColor = style.getPropertyValue("--bg");
    const accentColor = style.getPropertyValue("--accent");
    const tagsSelect = tags.items.map(tag => {return {value: tag.name,label:tag.name,id:tag._id}});
    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "transparent" }),

        option: (styles) => {
            return {
                ...styles,
                backgroundColor: bgColor,
                color: "#000",
                ":hover": {
                    ...styles[":active"],
                    backgroundColor: accentColor,
                },
            };
        },

        multiValueRemove: (styles) => ({
            ...styles,
            color: "#000",
            ":hover": {
                backgroundColor: "#000",
                color: "white",
            },
        }),
    };

    return (
        <div className={s.addPost}>
            <div className={s.container}>
                <div className={s.addPost__inner}>
                    {!imageUrl ? (
                        <button
                            onClick={() => {
                                inputRef.current.click();
                            }}
                            className="btn btn_l loadPreview"
                        >
                            Load Preview
                        </button>
                    ) : (
                        <button
                            className="btn btn_l"
                            onClick={() => {
                                setImageUrl("");
                            }}
                        >
                            Delete Preview
                        </button>
                    )}

                    <input
                        ref={inputRef}
                        onChange={handleImage}
                        className={s.loadInput}
                        type="file"
                        hidden
                    />
                    {imageUrl && (
                        <div className={s.preview}>
                            <img
                                src={`${imageUrl}`}
                                alt=""
                            />
                        </div>
                    )}

                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className="input"
                        placeholder="Title..."
                    />
                    <Select
                        isMulti
                        className="basic-multi-select"
                        options={tagsSelect}
                        styles={colourStyles}
                        value={selectedTags}
                        onChange={handleTagChange}
                    />
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                    <button className="btn btn_m" onClick={handlePublish}>
                        Public
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
