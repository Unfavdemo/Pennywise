import { useEffect, useState } from 'react';
import { apiRequest, handleApiResponse } from './api-helpers';

interface MigrationResult {
  transactionsMigrated: number;
  goalsMigrated: number;
  errors: string[];
}

export function useMigration() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationResult, setMigrationResult] = useState<MigrationResult | null>(null);

  const checkAndMigrate = async () => {
    // Check if migration has already been completed
    if (localStorage.getItem('pennywise_migration_complete') === 'true') {
      setMigrationComplete(true);
      return;
    }

    // Check for localStorage data
    const savedTransactions = localStorage.getItem('pennywise_transactions');
    const savedGoals = localStorage.getItem('pennywise_goals');

    if (!savedTransactions && !savedGoals) {
      setMigrationComplete(true);
      return;
    }

    try {
      setIsMigrating(true);

      const migrationData: any = {};

      if (savedTransactions) {
        try {
          migrationData.transactions = JSON.parse(savedTransactions);
        } catch (e) {
          console.error('Error parsing transactions from localStorage:', e);
        }
      }

      if (savedGoals) {
        try {
          migrationData.goals = JSON.parse(savedGoals);
        } catch (e) {
          console.error('Error parsing goals from localStorage:', e);
        }
      }

      if (migrationData.transactions || migrationData.goals) {
        const response = await apiRequest('/api/migrate', {
          method: 'POST',
          body: JSON.stringify(migrationData),
        });

        const result = await handleApiResponse<{ success: boolean } & MigrationResult>(response);
        setMigrationResult(result);

        if (result.success) {
          // Mark migration as complete
          localStorage.setItem('pennywise_migration_complete', 'true');
          
          // Optionally clear localStorage data after successful migration
          // Uncomment these lines if you want to clear localStorage after migration
          // localStorage.removeItem('pennywise_transactions');
          // localStorage.removeItem('pennywise_goals');
          
          setMigrationComplete(true);
        }
      } else {
        setMigrationComplete(true);
      }
    } catch (error: any) {
      console.error('Migration error:', error);
      setMigrationResult({
        transactionsMigrated: 0,
        goalsMigrated: 0,
        errors: [error.message || 'Migration failed'],
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return {
    isMigrating,
    migrationComplete,
    migrationResult,
    checkAndMigrate,
  };
}

