
import "./App.css";
import { ReactComponent as Plus } from "./icons/plus.svg";
import { ReactComponent as Twit } from "./icons/twit.svg";
import { ReactComponent as Face } from "./icons/face.svg";
import { ReactComponent as Cheese } from "./icons/cheese.svg";
import { ReactComponent as Cow } from "./icons/cow.svg";
import { ReactComponent as Choc } from "./icons/choc.svg";
import { ReactComponent as Arrow } from "./icons/arrow.svg";
import { ReactComponent as Bolt } from "./icons/bolt.svg";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <div className="App">
      <NavBar>
        <NavItem icon={<Plus />} />
        <NavItem icon={<Twit />} />
        <NavItem icon={<Face />} />
        <NavItem icon={<Cheese />}>
          <DropDown />
          {/*dropdown goes here */}
        </NavItem>
      </NavBar>
      <h1>Gear Demo app </h1>
    </div>
  );
}
function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropDown() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropDownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropDownItem></DropDownItem>
          <DropDownItem
            leftIcon={<Cow />}
            rightIcon={<Choc />}
            goToMenu="settings"
          >
            Settings
          </DropDownItem>
          <DropDownItem leftIcon="🦧" rightIcon={<Choc />} goToMenu="animals">
            Animals
          </DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        className="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
        <DropDownItem> My Profile </DropDownItem>
        <DropDownItem 
        leftIcon={<Cow />} 
        rightIcon={<Choc />} 
        goToMenu="main">
          Settings
        </DropDownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropDownItem goToMenu="main" leftIcon={<Arrow />}>
            <h2>My Tutorial</h2>
          </DropDownItem>
          <DropDownItem leftIcon={<Bolt />}>HTML</DropDownItem>
          <DropDownItem leftIcon={<Bolt />}>CSS</DropDownItem>
          <DropDownItem leftIcon={<Bolt />}>JavaScript</DropDownItem>
          <DropDownItem leftIcon={<Bolt />}>Awesome!</DropDownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropDownItem goToMenu="main" leftIcon={<Arrow />}>
            <h2>Animals</h2>
          </DropDownItem>
          <DropDownItem leftIcon="🦘">Kangaroo</DropDownItem>
          <DropDownItem leftIcon="🐸">Frog</DropDownItem>
          <DropDownItem leftIcon="🦋">Horse?</DropDownItem>
          <DropDownItem leftIcon="🦔">Hedgehog</DropDownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
