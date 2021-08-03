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

    return (
        <div id="enamad-logo">
            <a referrerPolicy="origin" target="_blank"
               href="https://trustseal.enamad.ir/?id=226320&amp;Code=7JkMVI8d9y40hFaRoblH" dideo-checked="true">
            <img
                src={enamdLogo}
                alt={alt}
                // onClick={handleClick}
                {...props}
            />
            </a>
        </div>
    );
};

EnamadLogo.defaultProps = {
    verified: true,
    width: 150,
    height: 150,
    style: { cursor: "pointer" , padding : 0 },
};

export default EnamadLogo;
