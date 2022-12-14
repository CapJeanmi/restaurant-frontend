import { useState } from "react";
import { size } from "lodash";
import {
  getTablesApi,
  addTablesApi,
  updateTablesApi,
  deleteTablesApi,
  getTableApi,
  getTableByNumberApi
} from "../api/table";
import { useAuth } from "./";

export function useTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState(null);
  const [table, setTable] = useState(null);
  const { auth } = useAuth();

  const getTables = async () => {
    try {
      setLoading(true);
      const result = await getTablesApi(auth.token);
      setLoading(false);
      setTables(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addTable = async (data) => {
    try {
      setLoading(true);
      await addTablesApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const updateTable = async (id, data) => {
    try {
      setLoading(true);
      await updateTablesApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const onDeleteTable = async (id) => {
    try {
      setLoading(true);
      await deleteTablesApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTable = async (idTable) => {
    try {
      setLoading(true);
      const response = await getTableApi(idTable);
      setLoading(false);
      setTable(response);

    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const isExistTable = async (tableNumber) => {
    try {
      const response = await getTableByNumberApi(tableNumber);
      if (size(response) === 0) throw Error();
      return true;
    } catch (error) {
      setError(error);
    }
  };

  const getTableByNumber = async (tableNumber) => {
    try {
      const response = await getTableByNumberApi(tableNumber);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  return {
    tables,
    table,
    loading,
    error,
    getTables,
    addTable,
    updateTable,
    onDeleteTable,
    getTable,
    isExistTable,
    getTableByNumber
  };
}
