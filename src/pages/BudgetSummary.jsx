import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Search } from 'lucide-react';
import { PageLoader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import budgetService from '../services/budgetService';
import { formatCurrency, showError } from '../utils/helpers';
import './Pages.css';

export const BudgetSummary = () => {
  const [programId, setProgramId] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!programId.trim()) {
      showError('Please enter a Program ID');
      return;
    }

    setLoading(true);
    try {
      const data = await budgetService.getBudgetSummary(parseInt(programId));
      setSummary(data);
      setSearched(true);
    } catch (error) {
      setSummary(null);
      setSearched(true);
      showError(error.message || 'Failed to fetch budget summary');
    } finally {
      setLoading(false);
    }
  };

  const summaryCards = summary ? [
    {
      label: 'Base Budget',
      value: formatCurrency(summary.baseBudget),
      icon: '💰',
      color: 'primary',
    },
    {
      label: 'Total Allocated',
      value: formatCurrency(summary.totalAllocated),
      icon: '📊',
      color: 'secondary',
    },
    {
      label: 'Remaining Base',
      value: formatCurrency(summary.remainingBase),
      icon: '📈',
      color: 'success',
    },
    {
      label: 'Total Used',
      value: formatCurrency(summary.totalUsed),
      icon: '💸',
      color: 'warning',
    },
    {
      label: 'Remaining Allocated',
      value: formatCurrency(summary.remainingAllocated),
      icon: '✅',
      color: 'info',
    },
  ] : [];

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="page-header">
        <div className="header-content">
          <BarChart2 size={32} />
          <div>
            <h2>Budget Summary</h2>
            <p className="text-muted">View detailed budget information for your programs</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Search Section */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-header">
            <h4>Search Program Budget</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <input
                  type="number"
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  placeholder="Enter Program ID"
                  min="1"
                  disabled={loading}
                  className="form-control"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <Search size={18} />
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Summary Results */}
        {loading && <PageLoader fullScreen={false} />}

        {searched && !loading && summary && (
          <motion.div
            className="summary-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="summary-header">
              <h3>Program #{summary.programId} - Budget Summary</h3>
            </div>

            <div className="summary-cards">
              {summaryCards.map((card, index) => (
                <motion.div
                  key={index}
                  className={`summary-card summary-${card.color}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ translateY: -5 }}
                >
                  <div className="card-icon">{card.icon}</div>
                  <div className="card-info">
                    <p className="card-label">{card.label}</p>
                    <h5 className="card-value">{card.value}</h5>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Budget Analysis */}
            <motion.div
              className="card mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-header">
                <h4>Budget Analysis</h4>
              </div>
              <div className="card-body">
                <div className="analysis-row">
                  <span className="label">Budget Utilization Rate:</span>
                  <span className="value fw-bold">
                    {summary.baseBudget > 0
                      ? `${(
                          ((summary.totalAllocated || 0) /
                            summary.baseBudget) *
                          100
                        ).toFixed(2)}%`
                      : 'N/A'}
                  </span>
                </div>
                <div className="progress mt-2" style={{ height: '25px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${
                        summary.baseBudget > 0
                          ? (
                              ((summary.totalAllocated || 0) /
                                summary.baseBudget) *
                              100
                            ).toFixed(2)
                          : 0
                      }%`,
                    }}
                    aria-valuenow={summary.totalAllocated}
                    aria-valuemin="0"
                    aria-valuemax={summary.baseBudget}
                  >
                    {summary.baseBudget > 0
                      ? `${(
                          ((summary.totalAllocated || 0) /
                            summary.baseBudget) *
                          100
                        ).toFixed(2)}%`
                      : ''}
                  </div>
                </div>

                <div className="analysis-row mt-3">
                  <span className="label">Status:</span>
                  <span className={`badge badge-${(summary.remainingBase || 0) > 0 ? 'success' : 'danger'}`}>
                    {(summary.remainingBase || 0) > 0 ? '✓ Healthy' : '⚠ Low Balance'}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {searched && !loading && !summary && (
          <EmptyState
            title="Program Not Found"
            message={`No budget summary found for Program ID: ${programId}`}
          />
        )}

        {!searched && (
          <EmptyState
            title="Search for Program Budget"
            message="Enter a Program ID above to view its budget summary and analysis"
          />
        )}
      </div>
    </motion.div>
  );
};

export default BudgetSummary;
