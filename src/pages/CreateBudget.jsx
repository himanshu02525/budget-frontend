import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import CreateBudgetForm from '../components/forms/CreateBudgetForm';
import { PageLoader } from '../components/common/Loader';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import budgetService from '../services/budgetService';
import { formatCurrency, formatDate } from '../utils/helpers';
import './Pages.css';

export const CreateBudget = () => {
  const [allocations, setAllocations] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    itemId: null,
    isLoading: false,
  });

  const handleSuccess = async (newAllocation) => {
    // Add new allocation to list
    setAllocations(prev => [newAllocation, ...prev]);
    
    // Refresh the list
    loadAllocations();
  };

  const loadAllocations = async () => {
    setLoadingList(true);
    try {
      const data = await budgetService.getAllAllocations();
      setAllocations(data || []);
    } catch (error) {
      console.error('Error loading allocations:', error);
    } finally {
      setLoadingList(false);
    }
  };

  const handleDelete = async (allocationId) => {
    setDeleteConfirm({ isOpen: true, itemId: allocationId, isLoading: false });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.itemId) {
      console.error('No item ID to delete');
      return;
    }

    setDeleteConfirm(prev => ({ ...prev, isLoading: true }));
    try {
      console.log('Deleting allocation:', deleteConfirm.itemId);
      const response = await budgetService.deleteAllocation(deleteConfirm.itemId);
      console.log('Delete response:', response);
      
      // Close dialog first
      setDeleteConfirm({ isOpen: false, itemId: null, isLoading: false });
      
      // Then reload the list to get fresh data
      await loadAllocations();
    } catch (error) {
      console.error('Error deleting allocation:', error);
      alert('Failed to delete allocation. Please try again.');
      setDeleteConfirm(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="page-header">
        <div className="header-content">
          <Plus size={32} />
          <div>
            <h2>Create Budget Allocation</h2>
            <p className="text-muted">Allocate monthly wise budget to your programs</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Form Section */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card">
            <div className="card-header">
              <h4>Budget Allocation Form</h4>
            </div>
            <div className="card-body">
              <CreateBudgetForm onSuccess={handleSuccess} />
            </div>
          </div>
        </motion.div>

        {/* List Section */}
        <motion.div
          className="list-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="card">
            <div className="card-header">
              <h4>All Budget Allocations</h4>
              <button
                className="btn btn-sm btn-primary"
                onClick={loadAllocations}
                disabled={loadingList}
              >
                {loadingList ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            <div className="card-body">
              {loadingList && <PageLoader fullScreen={false} />}
              {!loadingList && allocations && allocations.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Allocation ID</th>
                        <th>Program ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocations.map((alloc) => (
                        <motion.tr
                          key={alloc.allocationId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td>#{alloc.allocationId}</td>
                          <td>{alloc.programId}</td>
                          <td className="fw-bold">
                            {formatCurrency(alloc.amount)}
                          </td>
                          <td>{formatDate(alloc.date)}</td>
                          <td>
                            <span className={`badge badge-${alloc.status === 'ALLOCATED' ? 'success' : 'danger'}`}>
                              {alloc.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(alloc.allocationId)}
                            >
                              Delete
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                !loadingList && (
                  <div className="empty-state-simple">
                    <p>No allocations found. Create your first allocation!</p>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Allocation"
        message="Are you sure you want to delete this allocation? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, itemId: null, isLoading: false })}
        isLoading={deleteConfirm.isLoading}
        isDangerous={true}
      />
    </motion.div>
  );
};

export default CreateBudget;
