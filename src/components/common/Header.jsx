import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Users } from 'lucide-react';
import logo from '/DS_CLUB_LOGO.jpeg';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '/', hasDropdown: false },
        { name: 'Community', href: '#community', hasDropdown: false },
        { name: 'Research', href: '/research', hasDropdown: false },
        { name: 'Publications', href: '/publications', hasDropdown: false },
        { name: 'About', href: '#about', hasDropdown: false },
        { name: 'Contact', href: '/contact', hasDropdown: false }
    ];

    const isActive = (href) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname === href;
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-10 h-10 relative rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110 overflow-hidden">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-full h-full object-cover rounded-full drop-shadow-[0_0_6px_rgba(0,255,255,0.7)]"
                                />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            CLUSTER
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-1 group ${
                                        isActive(item.href)
                                            ? 'text-cyan-400'
                                            : 'text-slate-300 hover:text-cyan-400'
                                    }`}
                                >
                                    <span className="relative">
                                        {item.name}
                                        <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ${
                                            isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}></span>
                                    </span>
                                    {item.hasDropdown && (
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                    )}
                                </Link>

                                {item.hasDropdown && activeDropdown === index && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl border border-cyan-500/20 rounded-lg shadow-xl shadow-cyan-500/10 py-2 animate-in slide-in-from-top-2 duration-200">
                                        {item.dropdown?.map((dropItem, dropIndex) => (
                                            <Link
                                                key={dropIndex}
                                                to="#"
                                                className="block px-4 py-2 text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-200"
                                            >
                                                {dropItem}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Action Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a
                            href="https://discord.gg/6QN83D89vx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center space-x-2 group"
                        >
                            <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>Join Community</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-cyan-500/20 animate-in slide-in-from-top duration-300">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                        isActive(item.href)
                                            ? 'text-cyan-400 bg-cyan-500/10'
                                            : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-700">
                                <a
                                    href="https://discord.gg/6QN83D89vx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Users className="w-4 h-4" />
                                    <span>Join Community</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;