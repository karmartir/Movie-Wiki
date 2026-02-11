import Logo from "./Logo";
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <div className="navbar-div">
        <Logo />
        {children}
      </div>
    </nav>
  );
}
export default NavBar;
