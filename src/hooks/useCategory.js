import { useState } from "react";
import {
  getCategoriesApi,
  addCategoriesApi,
  updateCategoriesApi,
  deleteCategoriesApi,
} from "../api/category";
import { useAuth } from "./";

export function useCategory() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { auth } = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const result = await getCategoriesApi();
      setLoading(true);
      setCategories(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addCategory = async (data) => {
    try {
      setLoading(true);
      await addCategoriesApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      setLoading(true);
      await updateCategoriesApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const onDeleteCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategoriesApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    categories,
    loading,
    error,
    getCategories,
    addCategory,
    updateCategory,
    onDeleteCategory,
  };
}
