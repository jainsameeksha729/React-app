import React, { Fragment, useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";

// common components
// import Button from "../../components/Button/Button";
// import Select from "../Select/Select";
import RSelect from "../Select/RSelect";

// nav list and routes
import { LEFT_NAVBAR } from "./navList";

//constants
import { MENU_TYPE } from "../../constants/constants";

// css
import "./Header.scss";

const ss_cdn_url = process.env.REACT_APP_SS_CDN_URL;

const LeftSidebar = (props) => {
  const { pathname } = props.location;
  const { push } = props.history;
  const [navList, setNavList] = useState(LEFT_NAVBAR);
  const [menuType, setMenuType] = useState("state");

  useEffect(() => {
    const menuType = pathname.split("/");
    setMenuType(menuType[2]);
  }, [pathname]);

  

  const closeSideBar = () => {
    document.querySelector(".sidebar__wrapper").classList.remove("show_nav");
  };

  return (
    <Fragment>
      <div id="ss_sidebar">
        <div className="sidebar__wrapper">
          <span className="close_nav_icon ss_cursor">
            <i className="fa fa-times" onClick={closeSideBar}></i>
          </span>
          

          <div className="mt-4">
            
            <ul className="list-group">
              {navList.length > 0 &&
                navList.map((route) => {
                  return (
                    <Fragment key={route.key}>
                      <NavLink
                        to={`/app${route.path}`}
                        className={`list-group-item list-group-item-action flex-column align-items-start ss_sidebar_list`}
                        activeClassName="ss_active"
                      >
                        <div className="ss_list_item">
                          <i className={route.active_icon}></i>
                          <span>{route.value}</span>
                        </div>
                      </NavLink>
                    </Fragment>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(LeftSidebar);
