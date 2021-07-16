import React from "react";
import enamdLogo from './enamd.jpg'
interface PropTypes {
    verified?: boolean;
    sid: string | number;
    sp: string;
}

const EnamadLogo = ({
    verified,
    alt,
    onClick,
    ...props
}: PropTypes &
    React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
        >) => {
    const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (onClick) {
            onClick(e);
        } else
            window.open(
                `https://trustseal.enamad.ir/?id=221605&Code=cGhpi3pgrmOWGbTUyG2l`,
                "_blank"
            );
    };

    return (
        <div id="enamad-logo">
            <img
                src={enamdLogo}
                alt={alt}
                onClick={handleClick}
                {...props}
            />
        </div>
    );
};

EnamadLogo.defaultProps = {
    verified: true,
    width: 150,
    height: 150,
    style: { cursor: "pointer" },
};

export default EnamadLogo;
