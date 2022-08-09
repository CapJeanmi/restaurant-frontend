import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableListAdmin } from "../../components/Admin";
import { useTable } from "../../hooks";


export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => {
    getTables();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <HeaderPage title="Restaurant by Jeanmi" />
      {loading ? (
        <Loader active inline="centered" content="Cargando..." />
      ) : (
        <TableListAdmin tables={tables} />
      )}
    </>
  );
}
