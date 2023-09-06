import { create } from 'zustand';

interface PlanStore {
  selectedPlan: 'traveling' | 'planning' | 'end';
  setSelectedPlan: (plan: 'traveling' | 'planning' | 'end') => void;
}

export const usePlanStore = create<PlanStore>((set) => ({
  selectedPlan: 'traveling',
  setSelectedPlan: (plan) => {
    set({ selectedPlan: plan });
  },
}));
