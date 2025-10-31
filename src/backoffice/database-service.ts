// src/backoffice/DatabaseService.ts
import { ref, set, push, get, child, remove, update } from "firebase/database";
import { db } from "./firebase";
import type { PropertyAdvanced } from "../data/mock-properties-advanced";
import type { BlogPost } from "../data/mock-blog";

// --- Propiedades ---
export const addProperty = async (property: PropertyAdvanced) => {
  const newRef = push(ref(db, "properties"));
  await set(newRef, property);
  return newRef.key;
};

export const updateProperty = async (id: string, property: Partial<PropertyAdvanced>) => {
  await update(ref(db, `properties/${id}`), property);
};

export const deleteProperty = async (id: string) => {
  await remove(ref(db, `properties/${id}`));
};

export const getProperties = async (): Promise<{ id: string; data: PropertyAdvanced }[]> => {
  const snapshot = await get(ref(db, "properties"));
  const data = snapshot.val() || {};
  return Object.keys(data).map((key) => ({ id: key, data: data[key] }));
};

// --- Blog ---
export const addBlogPost = async (post: BlogPost) => {
  const newRef = push(ref(db, "blog"));
  await set(newRef, post);
  return newRef.key;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  await update(ref(db, `blog/${id}`), post);
};

export const deleteBlogPost = async (id: string) => {
  await remove(ref(db, `blog/${id}`));
};

export const getBlogPosts = async (): Promise<{ id: string; data: BlogPost }[]> => {
  const snapshot = await get(ref(db, "blog"));
  const data = snapshot.val() || {};
  return Object.keys(data).map((key) => ({ id: key, data: data[key] }));
};
