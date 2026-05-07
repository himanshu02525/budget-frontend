import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Zap, AlertCircle } from 'lucide-react';
import { PageLoader, SkeletonLoader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import budgetService from '../services/budgetService';
import resourceService from '../services/resourceService';
import { formatCurrency, handleApiError } from '../utils/helpers';
import './Dashboard.css';

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [allocations, setAllocations] = useState([]);
  const [resources, setResources] = useState([]);
  const [stats, setStats] = useState({
    totalAllocated: 0,
    totalResources: 0,
    activePrograms: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [allocData, resourceData] = await Promise.all([
        budgetService.getAllAllocations(),
        resourceService.getAllAllocatedResources(),
      ]);

      setAllocations(allocData || []);
      setResources(resourceData || []);

      // Calculate stats
      const totalAllocated = allocData?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
      const uniquePrograms = new Set(allocData?.map(a => a.programId) || []).size;

      setStats({
        totalAllocated,
        totalResources: resourceData?.length || 0,
        activePrograms: uniquePrograms,
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader fullScreen={false} />;
  }

  const statCards = [
    {
      title: 'Total Budget Allocated',
      value: formatCurrency(stats.totalAllocated),
      icon: DollarSign,
      color: 'primary',
      trend: '+2.5%',
    },
    {
      title: 'Resources Allocated',
      value: stats.totalResources,
      icon: Zap,
      color: 'secondary',
      trend: '+5 items',
    },
    {
      title: 'Active Programs',
      value: stats.activePrograms,
      icon: TrendingUp,
      color: 'info',
      trend: 'ongoing',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="dashboard-header" variants={itemVariants}>
        <h2>Dashboard</h2>
        <p className="text-muted">Welcome back, Program Manager</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className="stats-grid" variants={containerVariants}>
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              className={`stat-card stat-${card.color}`}
              variants={itemVariants}
              whileHover={{ translateY: -5, boxShadow: '0 10px 25px rgba(30, 77, 139, 0.2)' }}
            >
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">{card.title}</p>
                <h3>{card.value}</h3>
                <span className="stat-trend">{card.trend}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Allocations Section */}
      <motion.div className="dashboard-section" variants={itemVariants}>
        <div className="section-header">
          <h3>Recent Budget Allocations</h3>
          <a href="/#/create-budget" className="link-primary">
            View All →
          </a>
        </div>

        {allocations && allocations.length > 0 ? (
          <motion.div
            className="allocations-list"
            variants={containerVariants}
          >
            {allocations.slice(0, 5).map((alloc, index) => (
              <motion.div
                key={alloc.allocationId}
                className="allocation-item"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="allocation-info">
                  <h4>Program #{alloc.programId}</h4>
                  <p className="text-muted">
                    {new Date(alloc.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="allocation-amount">
                  {formatCurrency(alloc.amount)}
                </div>
                <span className={`badge badge-${alloc.status === 'ALLOCATED' ? 'success' : 'danger'}`}>
                  {alloc.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            title="No Allocations Yet"
            message="Start by creating your first budget allocation"
          />
        )}
      </motion.div>

      {/* Resources Section */}
      <motion.div className="dashboard-section" variants={itemVariants}>
        <div className="section-header">
          <h3>Allocated Resources</h3>
          <a href="/#/allocate-resources" className="link-primary">
            View All →
          </a>
        </div>

        {resources && resources.length > 0 ? (
          <motion.div
            className="resources-grid"
            variants={containerVariants}
          >
            {resources.slice(0, 6).map((resource, index) => (
              <motion.div
                key={resource.resourceId}
                className="resource-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="resource-type">{resource.type}</div>
                <h5>Program #{resource.programId}</h5>
                <p className="resource-quantity">
                  Quantity: <strong>{resource.quantity}</strong>
                </p>
                <span className={`badge badge-${resource.status === 'AVAILABLE' ? 'info' : 'warning'}`}>
                  {resource.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            title="No Resources Allocated"
            message="Allocate resources to your programs to get started"
          />
        )}
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        className="quick-tips"
        variants={itemVariants}
      >
        <div className="tips-header">
          <AlertCircle size={20} />
          <h4>Quick Tips</h4>
        </div>
        <ul className="tips-list">
          <li>Monitor your budget allocations regularly</li>
          <li>Ensure all resources are properly tracked</li>
          <li>Use the budget summary for detailed analysis</li>
          <li>Maintain accurate program IDs for consistency</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
