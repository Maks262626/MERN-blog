import { BallTriangle } from "react-loader-spinner";

function Preloader() {
    return (
        <BallTriangle
            height={300}
            width={300}
            radius={5}
            color="#FFD371"
            ariaLabel="ball-triangle-loading"
            wrapperClass="preloader"
            visible={true}
        />
    );
}

export default Preloader;