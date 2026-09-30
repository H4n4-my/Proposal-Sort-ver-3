import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { SavedProjectRecord, TenderProject, UserAccount, QuotationLink } from '../types';

export const EVALUATIONS_COLLECTION = 'tenderEvaluations';
export const USERS_COLLECTION = 'users';
export const LINKS_COLLECTION = 'quotationLinks';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Save quotation link to Firebase Firestore
 */
export async function saveQuotationLinkToFirestore(link: QuotationLink): Promise<void> {
  const path = `${LINKS_COLLECTION}/${link.id}`;
  try {
    const docRef = doc(db, LINKS_COLLECTION, link.id);
    await setDoc(docRef, {
      ...link,
      organization: 'Media Prima Berhad',
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Fetch all quotation links from Firebase Firestore
 */
export async function getQuotationLinksFromFirestore(): Promise<QuotationLink[]> {
  try {
    const snapshot = await getDocs(collection(db, LINKS_COLLECTION));
    const links: QuotationLink[] = [];
    snapshot.forEach(docSnap => {
      links.push(docSnap.data() as QuotationLink);
    });
    return links;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, LINKS_COLLECTION);
  }
}

/**
 * Delete a quotation link from Firebase Firestore
 */
export async function deleteQuotationLinkFromFirestore(id: string): Promise<void> {
  const path = `${LINKS_COLLECTION}/${id}`;
  try {
    const docRef = doc(db, LINKS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

/**
 * Save user profile in Firestore
 */
export async function saveUserProfile(user: UserAccount): Promise<void> {
  const path = `${USERS_COLLECTION}/${user.uid}`;
  try {
    const docRef = doc(db, USERS_COLLECTION, user.uid);
    await setDoc(docRef, {
      ...user,
      organization: 'Media Prima Berhad',
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserAccount | null> {
  const path = `${USERS_COLLECTION}/${uid}`;
  try {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserAccount;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Save or update a tender evaluation in Firestore, including quotation links
 */
export async function saveEvaluationToFirestore(
  project: TenderProject,
  user?: UserAccount | null
): Promise<SavedProjectRecord> {
  const id = `eval_${Date.now()}`;
  const record: SavedProjectRecord = {
    id,
    title: project.title || 'Untitled Tender Evaluation',
    refCode: project.refCode || 'RFP-UNASSIGNED',
    currency: project.currency,
    targetVolume: project.targetVolume,
    savedAt: new Date().toISOString(),
    optionsCount: project.options.length,
    projectData: JSON.parse(JSON.stringify(project)),
    links: project.links || [],
    userId: user?.uid || 'guest',
    userEmail: user?.email || 'user@mediaprima.com.my',
    organization: 'Media Prima Berhad',
  };

  const path = `${EVALUATIONS_COLLECTION}/${id}`;
  try {
    const docRef = doc(db, EVALUATIONS_COLLECTION, id);
    await setDoc(docRef, record);
    return record;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

/**
 * Fetch all saved evaluations from Firestore
 */
export async function getEvaluationsFromFirestore(): Promise<SavedProjectRecord[]> {
  try {
    const q = query(collection(db, EVALUATIONS_COLLECTION), orderBy('savedAt', 'desc'), limit(25));
    const snapshot = await getDocs(q);
    const records: SavedProjectRecord[] = [];
    snapshot.forEach(docSnap => {
      records.push(docSnap.data() as SavedProjectRecord);
    });
    return records;
  } catch (error) {
    // If the index or orderBy fails, try simple collection getDocs
    try {
      const snapshot = await getDocs(collection(db, EVALUATIONS_COLLECTION));
      const records: SavedProjectRecord[] = [];
      snapshot.forEach(docSnap => {
        records.push(docSnap.data() as SavedProjectRecord);
      });
      return records.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    } catch (innerError) {
      handleFirestoreError(innerError, OperationType.LIST, EVALUATIONS_COLLECTION);
    }
  }
}

/**
 * Delete an evaluation from Firestore
 */
export async function deleteEvaluationFromFirestore(id: string): Promise<void> {
  const path = `${EVALUATIONS_COLLECTION}/${id}`;
  try {
    const docRef = doc(db, EVALUATIONS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}
