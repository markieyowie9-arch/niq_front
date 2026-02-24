import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  signOut as fbSignOut,
} from "firebase/auth";
import { isConfigured, auth, db } from "@/utils/firebase";

const USE_FIREBASE =
  process.env.NEXT_PUBLIC_USE_FIREBASE === "true" && isConfigured();

// --- Mock data (kept so UI remains testable) ---
const mockProducts = [
  {
    id: "1",
    name: "Laundry Detergent",
    price: 120,
    stock: 15,
    category: "Detergent",
    image: "/product1.jpg",
    status: "Active",
  },
  {
    id: "2",
    name: "Dishwashing Liquid",
    price: 85,
    stock: 0,
    category: "Dishwashing",
    image: "/product2.jpg",
    status: "Active",
  },
  {
    id: "3",
    name: "Car Shampoo",
    price: 150,
    stock: 5,
    category: "Car Care",
    image: "/product3.jpg",
    status: "Active",
  },
  {
    id: "4",
    name: "Bleach",
    price: 60,
    stock: 20,
    category: "Cleaning",
    image: "/product4.jpg",
    status: "Inactive",
  },
];

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2024-02-20",
    total: 1250,
    status: "Pending",
    payment: "GCash",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2024-02-20",
    total: 890,
    status: "Processing",
    payment: "PayMaya",
    items: 2,
  },
];

const mockEmployees = [
  {
    id: "e1",
    name: "Admin User",
    email: "admin@niq.com",
    role: "Admin",
    lastLogin: "2024-02-20",
    status: "Active",
  },
  {
    id: "e2",
    name: "Employee One",
    email: "emp1@niq.com",
    role: "Employee",
    lastLogin: "2024-02-19",
    status: "Active",
  },
];

const mockInventory = [
  {
    id: "1",
    product: "Laundry Detergent",
    stock: 45,
    buffer: 20,
    critical: 10,
    mlSuggestion: 25,
    lastUpdated: "2024-02-20",
  },
  {
    id: "2",
    product: "Dishwashing Liquid",
    stock: 2,
    buffer: 15,
    critical: 8,
    mlSuggestion: 20,
    lastUpdated: "2024-02-19",
  },
  {
    id: "3",
    product: "Car Shampoo",
    stock: 8,
    buffer: 15,
    critical: 8,
    mlSuggestion: 15,
    lastUpdated: "2024-02-18",
  },
  {
    id: "4",
    product: "Bleach",
    stock: 25,
    buffer: 15,
    critical: 8,
    mlSuggestion: 15,
    lastUpdated: "2024-02-20",
  },
];

const mockAudit = [
  {
    id: "a1",
    timestamp: "2024-02-20 09:23:45",
    user: "Admin User",
    action: "Login",
    details: "Logged in successfully",
    ip: "192.168.1.100",
  },
  {
    id: "a2",
    timestamp: "2024-02-20 09:30:12",
    user: "Admin User",
    action: "Update Product",
    details: "Updated price of Laundry Detergent",
    ip: "192.168.1.100",
  },
];

// Small helper to simulate async
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

export async function getProducts() {
  if (USE_FIREBASE && db) {
    const q = query(collection(db, "products"), orderBy("name"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  await delay();
  return mockProducts;
}

export async function getProductById(id) {
  if (USE_FIREBASE && db) {
    const d = await getDoc(doc(db, "products", id));
    return d.exists() ? { id: d.id, ...d.data() } : null;
  }

  await delay();
  return mockProducts.find((p) => String(p.id) === String(id)) || null;
}

export async function createProduct(payload) {
  if (USE_FIREBASE && db) {
    const ref = await addDoc(collection(db, "products"), payload);
    return { id: ref.id, ...payload };
  }

  await delay();
  const newItem = { id: String(Date.now()), ...payload };
  mockProducts.push(newItem);
  return newItem;
}

export async function updateProduct(id, payload) {
  if (USE_FIREBASE && db) {
    await updateDoc(doc(db, "products", id), payload);
    return { id, ...payload };
  }

  await delay();
  const idx = mockProducts.findIndex((p) => String(p.id) === String(id));
  if (idx >= 0) {
    mockProducts[idx] = { ...mockProducts[idx], ...payload };
    return mockProducts[idx];
  }
  return null;
}

export async function deleteProduct(id) {
  if (USE_FIREBASE && db) {
    await deleteDoc(doc(db, "products", id));
    return true;
  }

  await delay();
  const idx = mockProducts.findIndex((p) => String(p.id) === String(id));
  if (idx >= 0) {
    mockProducts.splice(idx, 1);
    return true;
  }
  return false;
}

export async function getOrders() {
  if (USE_FIREBASE && db) {
    const q = query(collection(db, "orders"), orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  await delay();
  return mockOrders;
}

export async function createOrder(payload) {
  if (USE_FIREBASE && db) {
    const ref = await addDoc(collection(db, "orders"), payload);
    // optionally update stock (server should handle this reliably)
    return { id: ref.id, ...payload };
  }

  await delay();
  const newOrder = { id: `ORD-${Date.now()}`, ...payload };
  mockOrders.unshift(newOrder);
  // reduce mock product stock when items present
  if (payload.items && Array.isArray(payload.items)) {
    payload.items.forEach((it) => {
      const mp = mockProducts.find((p) => String(p.id) === String(it.id));
      if (mp) mp.stock = Math.max(0, mp.stock - (it.quantity || 0));
    });
  }
  return newOrder;
}

export async function getEmployees() {
  if (USE_FIREBASE && db) {
    const snap = await getDocs(collection(db, "employees"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  await delay();
  return mockEmployees;
}

export async function getInventory() {
  if (USE_FIREBASE && db) {
    const snap = await getDocs(collection(db, "inventory"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  await delay();
  return mockInventory;
}

export async function getAuditLogs() {
  if (USE_FIREBASE && db) {
    const snap = await getDocs(collection(db, "audit"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  await delay();
  return mockAudit;
}

export async function updateOrder(id, payload) {
  if (USE_FIREBASE && db) {
    await updateDoc(doc(db, "orders", id), payload);
    return { id, ...payload };
  }

  await delay();
  const idx = mockOrders.findIndex((o) => o.id === id);
  if (idx >= 0) {
    mockOrders[idx] = { ...mockOrders[idx], ...payload };
    return mockOrders[idx];
  }
  return null;
}

// Auth helpers
export async function signIn(email, password) {
  if (USE_FIREBASE && auth) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  }

  // Mock success for testing
  await delay();
  if (email && password) return { uid: "mock-user", email };
  throw new Error("Invalid credentials");
}

export async function signUp(email, password) {
  if (USE_FIREBASE && auth) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  }

  await delay();
  return { uid: "mock-user-" + Date.now(), email };
}

export async function sendPasswordReset(email) {
  if (USE_FIREBASE && auth) {
    return fbSendPasswordResetEmail(auth, email);
  }

  await delay();
  return true;
}

export async function signOut() {
  if (USE_FIREBASE && auth) {
    return fbSignOut(auth);
  }

  await delay();
  return true;
}

// Cart persistence helpers (for logged-in users)
export async function saveCartForUser(userId, cart) {
  if (USE_FIREBASE && db) {
    await updateDoc(doc(db, "carts", userId), { items: cart });
    return true;
  }

  await delay();
  // no-op in mock mode
  return true;
}

export async function loadCartForUser(userId) {
  if (USE_FIREBASE && db) {
    const d = await getDoc(doc(db, "carts", userId));
    return d.exists() ? d.data().items || [] : [];
  }

  await delay();
  return [];
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  createOrder,
  getEmployees,
  getInventory,
  getAuditLogs,
  updateOrder,
  signIn,
  signUp,
  sendPasswordReset,
  signOut,
  saveCartForUser,
  loadCartForUser,
};
