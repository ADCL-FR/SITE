import PropTypes, {arrayOf, string} from "prop-types";
import {Navigate} from "react-router-dom";
import {Link} from "react-router-dom";

export default function HeaderNav({ links }) {

    function navigateTo(href) {
        return <Navigate to={href} />;
    }

    return (
        <div className="flex flex-row gap-4">
            {links.map((link, key) => (
                <div className="flex felx-row" key={key}>
                <Link to={link.href} className="flex flex-row underline gap-4 mr-2">
                    {link.title}
                </Link>
                {key !== links.length - 1 && <span className="text-gray-400 mr-2">{` > `}</span>}
                </div>
                ))}

        </div>
    )
}
HeaderNav.propTypes = {
    links: arrayOf(
        PropTypes.shape({
            title: string,
            href: string
        })
    )
}