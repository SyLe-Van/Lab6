import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faPlus, faShapes, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Contact from '~/components/Contact';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Drawer, Space, Dropdown } from 'antd';
import { LockOutlined, UserOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input } from 'antd';
import { Navigate } from 'react-router-dom';
import { UserContext,  } from '~/UserContext';
import Login from '~/pages/login';

const cx = classNames.bind(styles);

export default function Sidebar() {
    // const [username, setUsername] = useState(null);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [showDropdown, setShowDropdown] = useState(false);
    const {setUserInfo, userInfo} = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, []);
    function logout() {
        fetch('http://localhost:3000/logout', {
          credentials: 'include',
          method: 'POST',
        });
        setUserInfo(null);
    }

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const username = userInfo?.username;

    return (    
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('fragment')}></div>

                <div className={cx('menu')}>
                    <ul className={cx('menu-list')}>
                        <li>
                            <Link to="/lifestyle">LIFESTYLE</Link>
                        </li>
                        <li>
                            <Link to="/fashion">FASHION</Link>
                        </li>
                        <li>
                            <Link to="/cinema">CINEMA</Link>
                        </li>
                        <li>
                            <Link to="/grooming">GROOMING</Link>
                        </li>
                    </ul>
                </div>
                {username && (
                    <>
                        <div className={cx('menu-contact')}>
                            <ul>
                                <li className={cx('menu-mode')}>
                                        <button className={cx('moon')}>
                                            <FontAwesomeIcon icon={faMoon} style={{color: "#000000",}} />
                                        </button>
                                    </li>
                                <li className={cx('menu-login')}>
                                    {/* <button
                                        className={cx('user-icon-button')} 
                                        onClick={() => setShowLogin(!showLogin)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ color: '#000000' }} />
                                    </button>
                                    {showLogin && (
                                        <div className={cx('login-modal')}>
                                            <div className={cx('modal-content')}>
                                                <button 
                                                    className={cx('login-modal-close-button')} 
                                                    onClick={toggleLogin}
                                                >
                                                    X
                                                </button>
                                                <Login />
                                            </div>
                                        </div>
                                    )} */}
                                    <Link to="/create">
                                        <Button className={cx('add-post-button')}>
                                            <FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} />
                                        </Button>
                                    </Link> 
                                </li>
                                <li className={cx('menu-bars')}>
                                    <Button className={cx('logout')} onClick={logout}>
                                        <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#000000",}}/>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
                {
                    !username && (
                        <div className={cx('menu-contact')}>
                            <ul>
                                <li className={cx('menu-mode')}>
                                    <button className={cx('moon')}>
                                        <FontAwesomeIcon icon={faMoon} style={{color: "#000000",}} />
                                    </button>
                                </li>
                                <li className={cx('menu-login')}>
                                    <button
                                        className={cx('user-icon-button')} 
                                        onClick={() => setShowLogin(!showLogin)}
                                    >
                                        <FontAwesomeIcon icon={faUser} style={{ color: '#000000' }} />
                                    </button>
                                    {showLogin && (
                                        <div className={cx('login-modal')}>
                                            <div className={cx('modal-content')}>
                                                <button 
                                                    className={cx('login-modal-close-button')} 
                                                    onClick={toggleLogin}
                                                >
                                                    X
                                                </button>
                                                <Login />
                                            </div>
                                        </div>
                                    )}
                                    {/* <Link to="/login">
                                        <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
                                    </Link> */}
                                </li>
                                <li className={cx('menu-bars')}>
                                    <Space>
                                        <Button className={cx('bars')} onClick={showLargeDrawer}>
                                            <FontAwesomeIcon icon={faBars} style={{color: "#000000",}} />
                                        </Button>
                                    </Space>
                                    <Drawer
                                        placement="right"
                                        onClose={onClose} open={open}
                                        size={size}
                                    >
                                    <p>Nothing!</p>
                                    
                                    </Drawer>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </aside>
    );
}

