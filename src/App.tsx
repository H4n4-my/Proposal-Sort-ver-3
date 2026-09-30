/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TenderProject, SavedProjectRecord, VendorOption, UserAccount } from './types';
import { INITIAL_PROJECT, INITIAL_OPTIONS } from './data/sampleData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Screen1Upload } from './components/Screen1Upload';
import { Screen2Review } from './components/Screen2Review';
import { Screen3Matrix } from './components/Screen3Matrix';
import { HistoryDrawer } from './components/HistoryDrawer';
import { AddOptionModal } from './components/AddOptionModal';
import { BoardroomModal } from './components/BoardroomModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import {
  auth,
  initFirebaseAuth,
  testFirestoreConnection,
  onAuthStateChanged,
  signOut,
} from './firebase';
import {
  saveEvaluationToFirestore,
  getEvaluationsFromFirestore,
  deleteEvaluationFromFirestore,
  getUserProfile,
  saveUserProfile,
} from './services/evaluationService';

const STORAGE_KEY = 'tendertab_v2_evaluations';
const USER_STORAGE_KEY = 'tendertab_active_user';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [project, setProject] = useState<TenderProject>(() => {
    return JSON.parse(JSON.stringify(INITIAL_PROJECT));
  });
  const [savedProjects, setSavedProjects] = useState<SavedProjectRecord[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBoardroomModalOpen, setIsBoardroomModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(false);

  // Authentication State: Require Sign In / Sign Up on first open or when not logged in
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(USER_STORAGE_KEY);
    } catch {
      return true;
    }
  });

  // Track Firebase Auth state & load evaluations
  useEffect(() => {
    let unsubscribeAuth: (() => void) | null = null;

    async function setupFirebaseAndLoad() {
      await initFirebaseAuth();
      const connected = await testFirestoreConnection();
      setIsCloudConnected(connected);

      // Listen for Firebase Auth changes across multiple users
      unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          try {
            const profile = await getUserProfile(fbUser.uid);
            if (profile) {
              setCurrentUser(profile);
              localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
              setIsAuthModalOpen(false);
            } else {
              const newProfile: UserAccount = {
                uid: fbUser.uid,
                email: fbUser.email || '',
                displayName: fbUser.displayName || (fbUser.email?.includes('fatihana') ? 'Nur Fatihana' : 'Media Prima Executive'),
                organization: 'Media Prima Berhad',
                department: 'Group Sourcing & Procurement',
                role: 'Executive',
              };
              await saveUserProfile(newProfile);
              setCurrentUser(newProfile);
              localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newProfile));
              setIsAuthModalOpen(false);
            }
          } catch (e) {
            console.warn('Error fetching user profile:', e);
          }
        } else {
          // If no Firebase user session and no local user cached, force open Sign In/Sign Up
          const localUser = localStorage.getItem(USER_STORAGE_KEY);
          if (!localUser) {
            setCurrentUser(null);
            setIsAuthModalOpen(true);
          }
        }
      });

      try {
        // Try fetching from Firebase Firestore first
        const cloudRecords = await getEvaluationsFromFirestore();
        if (cloudRecords && cloudRecords.length > 0) {
          setSavedProjects(cloudRecords);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudRecords));
          return;
        }
      } catch (err) {
        console.warn('Could not read from Firestore, falling back to local storage:', err);
      }

      // Local storage fallback
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          setSavedProjects(JSON.parse(raw));
        } else {
          const seedHistory: SavedProjectRecord[] = [
            {
              id: 'proj-seed-01',
              title: 'HQ Multi-Function Printer Replacement 2025',
              refCode: 'RFP-2025-MFP-HQ01',
              currency: 'RM',
              targetVolume: 25000,
              savedAt: new Date(Date.now() - 86400000).toISOString(),
              optionsCount: 6,
              projectData: JSON.parse(JSON.stringify(INITIAL_PROJECT)),
              organization: 'Media Prima Berhad',
            },
          ];
          setSavedProjects(seedHistory);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seedHistory));
        }
      } catch (e) {
        console.error('Failed to read from localStorage:', e);
      }
    }

    setupFirebaseAndLoad();

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, []);

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.displayName} (Media Prima Berhad)!`, 'success');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Firebase signout error:', e);
    }
    setCurrentUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    setIsAuthModalOpen(true);
    showToast('You have been signed out of Media Prima Berhad procurement suite.', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleNavigateStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProjectMeta = (updates: Partial<TenderProject>) => {
    setProject(prev => ({ ...prev, ...updates }));
  };

  const handleLoadSample = () => {
    setProject(JSON.parse(JSON.stringify(INITIAL_PROJECT)));
    showToast('Loaded 3 Vendors (6 Dual-Tier Options) with realistic RFP data.', 'success');
  };

  const handleExtractData = () => {
    showToast('Successfully parsed OCR data into Brand New & Refurbished categories.', 'success');
    handleNavigateStep(2);
  };

  const handleUpdateOption = (optionId: string, updates: Partial<VendorOption>) => {
    setProject(prev => ({
      ...prev,
      options: prev.options.map(opt =>
        opt.id === optionId ? { ...opt, ...updates } : opt
      ),
    }));
  };

  const handleRemoveOption = (optionId: string) => {
    if (project.options.length <= 1) {
      showToast('At least one option must remain in the evaluation.', 'error');
      return;
    }
    setProject(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== optionId),
    }));
    showToast('Option removed from active scope.', 'info');
  };

  const handleAddOption = (newOption: VendorOption) => {
    setProject(prev => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
    showToast(`Added ${newOption.vendor} (${newOption.model}) to evaluation.`, 'success');
  };

  const handleSaveToHistory = async () => {
    try {
      // 1. Save to Firebase Firestore
      let cloudRecord: SavedProjectRecord | null = null;
      try {
        cloudRecord = await saveEvaluationToFirestore(project, currentUser);
      } catch (cloudErr) {
        console.warn('Cloud sync error, saving locally:', cloudErr);
      }

      // 2. Update local state & localStorage
      const recordToSave: SavedProjectRecord = cloudRecord || {
        id: `proj-${Date.now()}`,
        title: project.title || 'Untitled Tender',
        refCode: project.refCode || 'RFP-UNASSIGNED',
        currency: project.currency,
        targetVolume: project.targetVolume,
        savedAt: new Date().toISOString(),
        optionsCount: project.options.length,
        projectData: JSON.parse(JSON.stringify(project)),
        links: project.links || [],
        userId: currentUser?.uid || 'guest',
        userEmail: currentUser?.email || 'user@mediaprima.com.my',
        organization: 'Media Prima Berhad',
      };

      const updated = [recordToSave, ...savedProjects.filter(p => p.id !== recordToSave.id).slice(0, 14)];
      setSavedProjects(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      if (cloudRecord) {
        showToast('Tender evaluation & links synced to Firebase Firestore cloud database.', 'success');
      } else {
        showToast('Tender evaluation persisted to browser vault.', 'success');
      }
    } catch (e: any) {
      showToast(`Failed to save: ${e.message}`, 'error');
    }
  };

  const handleLoadSavedProject = (record: SavedProjectRecord) => {
    setProject(JSON.parse(JSON.stringify(record.projectData)));
    setIsHistoryOpen(false);
    handleNavigateStep(3);
    showToast(`Loaded saved project: ${record.title}`, 'info');
  };

  const handleDeleteSavedProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteEvaluationFromFirestore(id);
    } catch (cloudErr) {
      console.warn('Could not delete from Firestore:', cloudErr);
    }

    const updated = savedProjects.filter(p => p.id !== id);
    setSavedProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    showToast('Record deleted.', 'info');
  };

  const handleClearAllHistory = async () => {
    if (window.confirm('Clear all saved project evaluations from storage?')) {
      for (const p of savedProjects) {
        try {
          await deleteEvaluationFromFirestore(p.id);
        } catch {
          // ignore individual delete fails
        }
      }
      setSavedProjects([]);
      localStorage.removeItem(STORAGE_KEY);
      showToast('All saved projects cleared.', 'info');
    }
  };

  const handleResetSession = () => {
    if (window.confirm('Reset current tender evaluation workflow back to Stage 1?')) {
      setProject(JSON.parse(JSON.stringify(INITIAL_PROJECT)));
      handleNavigateStep(1);
      showToast('Evaluation session reset.', 'info');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Top Application Header with Media Prima Berhad & User Session */}
      <Header
        currentStep={currentStep}
        onNavigateStep={handleNavigateStep}
        scopeRef={project.refCode}
        savedCount={savedProjects.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onResetSession={handleResetSession}
        isCloudConnected={isCloudConnected}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentStep === 1 && (
          <Screen1Upload
            project={project}
            onUpdateProjectMeta={handleUpdateProjectMeta}
            onLoadSample={handleLoadSample}
            onExtractData={handleExtractData}
            currentUser={currentUser}
            onShowToast={showToast}
          />
        )}

        {currentStep === 2 && (
          <Screen2Review
            project={project}
            onUpdateOption={handleUpdateOption}
            onRemoveOption={handleRemoveOption}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onNavigateStep={handleNavigateStep}
            onShowToast={showToast}
          />
        )}

        {currentStep === 3 && (
          <Screen3Matrix
            project={project}
            onNavigateStep={handleNavigateStep}
            onSaveToHistory={handleSaveToHistory}
            onOpenBoardroomModal={() => setIsBoardroomModalOpen(true)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Protocol Footer */}
      <Footer />

      {/* Slide-over Drawer for Saved Projects */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedProjects={savedProjects}
        onLoadProject={handleLoadSavedProject}
        onDeleteProject={handleDeleteSavedProject}
        onClearAll={handleClearAllHistory}
      />

      {/* Modal: Add Custom Option */}
      <AddOptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        currency={project.currency}
        onAddOption={handleAddOption}
      />

      {/* Modal: Boardroom PDF Memorandum */}
      <BoardroomModal
        isOpen={isBoardroomModalOpen}
        onClose={() => setIsBoardroomModalOpen(false)}
        project={project}
      />

      {/* Modal: Sign In / Sign Up Gate with Media Prima Berhad Branding */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onSuccess={handleAuthSuccess}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
