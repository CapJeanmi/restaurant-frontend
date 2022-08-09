import { useState } from "react";
import {
  getProductsApi,
  addProductsApi,
  updateProductsApi,
  deleteProductsApi,
  getProductByIdApi,
  getProductsByCategoryApi
} from "../api/product";
import { useAuth } from "./";

export function useProduct() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const result = await getProductsApi();
      setLoading(false);
      setProducts(result);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      await addProductsApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      await updateProductsApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const onDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductsApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProductById = async (id) => {
    try {
      const result = await getProductByIdApi(id);
      return result;
    } catch (error) {
      setError(error);
    }
  };

  const getProductsByCategory = async (idCategory) => {
    try {
      setLoading(true);
      const response = await getProductsByCategoryApi(idCategory);
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    products,
    loading,
    error,
    getProducts,
    addProduct,
    updateProduct,
    onDeleteProduct,
    getProductById,
    getProductsByCategory
  };
}
