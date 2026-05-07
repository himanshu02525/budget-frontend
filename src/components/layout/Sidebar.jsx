import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, ChevronLeft, Plus, Zap, BarChart2 } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({ onToggle, initialState = true }) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      id: 1,
      label: 'Dashboard',
      to: '/',
      icon: BarChart2,
    },
    {
      id: 2,
      label: 'Create Budget',
      to: '/create-budget',
      icon: Plus,
    },
    {
      id: 3,
      label: 'Allocate Resources',
      to: '/allocate-resources',
      icon: Zap,
    },
    {
      id: 4,
      label: 'View Summary',
      to: '/budget-summary',
      icon: BarChart2,
    },
  ];

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        className="sidebar-toggle-mobile"
        onClick={toggleMobileSidebar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="sidebar-overlay"
            onClick={toggleMobileSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isOpen ? 'expanded' : 'collapsed'} ${
          isMobileOpen ? 'mobile-open' : ''
        }`}
        initial={false}
        animate={{
          width: isOpen ? '280px' : '80px',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Desktop Toggle Button */}
        <motion.button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon size={20} />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer Info */}
        {isOpen && (
          <motion.div
            className="sidebar-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sidebar-info">
              <p className="text-muted">System Version</p>
              <p className="version">1.0.0</p>
            </div>
          </motion.div>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
