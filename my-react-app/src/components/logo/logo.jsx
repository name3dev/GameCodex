import logo from "../../../src/assets/logo.png";

function Logo({ size = 60 }) {
    return (
        <div className="logo">
            <img className="logo-icon"
                src={logo}
                alt="GameCodex"
            />
        </div>
    );
}

export default Logo;