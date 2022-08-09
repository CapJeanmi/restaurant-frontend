import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableTablesAdmin,
  AddEditTableForm,
} from "../../components/Admin";
import { useTable } from "../../hooks/useTable";
import { ModalBasic } from "../../components/Common";

export function TablesAdmin() {
  const { loading, tables, getTables, onDeleteTable } = useTable();
  const [ShowModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getTables();
    // eslint-disable-next-line
  }, [refetch]);

  const openCloseModal = () => setShowModal(prev => !prev);
  const onRefetch = () => setRefetch(prev => !prev);

  const addTable = () => {
    setTitleModal("Agregar Mesa");
    setContentModal(
      <AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateTable = (data) => {
    setTitleModal("Actualizar Tabla");
    setContentModal(
      <AddEditTableForm
        table={data}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const deleteTable = (data) => {
    const result = window.confirm(
      `¿Está seguro de eliminar la mesa ${data.number}?`
    );
    if (result) {
      onDeleteTable(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeaderPage
        title="Mesas"
        btnTitle="Crear nueva mesa"
        btnClick={addTable}
      />
      {loading ? (
        <Loader active inline="centered">
          {" "}
          Cargando ...
        </Loader>
      ) : (
        <TableTablesAdmin
          tables={tables}
          updateTable={updateTable}
          deleteTable={deleteTable}
        />
      )}
      <ModalBasic
        show={ShowModal}
        title={titleModal}
        children={contentModal}
        onClose={openCloseModal}
      />
    </>
  );
}
