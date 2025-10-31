// src/backoffice/DatabaseService.ts
import { ref, set, push, get, remove, update } from "firebase/database";
import { database } from "./firebase";
import type { PropertyAdvanced } from "../data/mock-properties-advanced";
import type { BlogPost } from "../data/mock-blog";

// --- Propiedades ---
export const addProperty = async (property: PropertyAdvanced) => {
  const newRef = push(ref(database, "properties"));
  await set(newRef, property);
  return newRef.key;
};

export const updateProperty = async (id: string, property: Partial<PropertyAdvanced>) => {
  await update(ref(database, `properties/${id}`), property);
};

export const deleteProperty = async (id: string) => {
  await remove(ref(database, `properties/${id}`));
};

export const getProperties = async (): Promise<{ id: string; data: PropertyAdvanced }[]> => {
  const snapshot = await get(ref(database, "properties"));
  const data = snapshot.val() || {};
  return Object.keys(data).map((key) => ({ id: key, data: data[key] }));
};

// --- Blog ---
export const addatabaselogPost = async (post: BlogPost) => {
  const newRef = push(ref(database, "blog"));
  await set(newRef, post);
  return newRef.key;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  await update(ref(database, `blog/${id}`), post);
};

export const deleteBlogPost = async (id: string) => {
  await remove(ref(database, `blog/${id}`));
};

export const getBlogPosts = async (): Promise<{ id: string; data: BlogPost }[]> => {
  const snapshot = await get(ref(database, "blog"));
  const data = snapshot.val() || {};
  return Object.keys(data).map((key) => ({ id: key, data: data[key] }));
};
