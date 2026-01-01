import { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';

// Validation schema for goal form
const goalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  targetAmount: z.number().positive('Target amount must be greater than 0'),
  deadline: z.string().optional().refine((date) => {
    if (!date) return true;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Deadline cannot be in the past'),
});

export default function AddGoalModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (fieldName, value) => {
    try {
      const formData = {
        name: fieldName === 'name' ? value : name,
        targetAmount: fieldName === 'targetAmount' ? (value ? parseFloat(value) : 0) : parseFloat(targetAmount) || 0,
        deadline: fieldName === 'deadline' ? value : deadline,
      };
      
      goalSchema.parse(formData);
      setErrors(prev => ({ ...prev, [fieldName]: null }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(e => e.path.includes(fieldName));
        if (fieldError) {
          setErrors(prev => ({ ...prev, [fieldName]: fieldError.message }));
          return false;
        }
      }
      setErrors(prev => ({ ...prev, [fieldName]: null }));
      return true;
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const value = fieldName === 'name' ? name : 
                  fieldName === 'targetAmount' ? targetAmount : deadline;
    validateField(fieldName, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, targetAmount: true, deadline: true });
    
    const formData = {
      name,
      targetAmount: parseFloat(targetAmount),
      deadline: deadline || undefined,
    };

    try {
      goalSchema.parse(formData);
      setErrors({});
      onAdd(formData);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach(err => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 dark:text-gray-100">Create Savings Goal</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Goal Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched.name) validateField('name', e.target.value);
              }}
              onBlur={() => handleBlur('name')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.name && touched.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., Emergency Fund"
              required
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Target Amount *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={targetAmount}
                onChange={(e) => {
                  setTargetAmount(e.target.value);
                  if (touched.targetAmount) validateField('targetAmount', e.target.value);
                }}
                onBlur={() => handleBlur('targetAmount')}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  errors.targetAmount && touched.targetAmount ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="0.00"
                required
              />
            </div>
            {errors.targetAmount && touched.targetAmount && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.targetAmount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Deadline (Optional)</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                if (touched.deadline) validateField('deadline', e.target.value);
              }}
              onBlur={() => handleBlur('deadline')}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                errors.deadline && touched.deadline ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.deadline && touched.deadline && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deadline}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-lg hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors"
            >
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

