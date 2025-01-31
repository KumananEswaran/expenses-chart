import './header.css';
import logo from '../../assets/logo.svg';

function Header() {
	return (
		<div className="header">
			<div className="header__content">
				<p className="header__title">My balance</p>
				<p className="header__balance">$921.48</p>
			</div>
			<div className="header__shape">
				<img src={logo} alt="" />
			</div>
		</div>
	);
}
export default Header;
