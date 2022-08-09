import React, { useEffect, useState } from "react";
import {
  HeaderPage,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from "../../components/Admin";
import { useCategory } from "../../hooks/useCategory";
import { ModalBasic } from "../../components/Common";

export function CategoriesAdmin() {
  const { categories, getCategories, onDeleteCategory } = useCategory();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);


  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Crear Categoría");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar Categoría");
    setContentModal(
      <AddEditCategoryForm
        category={data}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const deleteCategory = (data) => {
    const result = window.confirm(
      `¿Está seguro de eliminar la categoría ${data.title}?`
    );
    if (result) {
      onDeleteCategory(data.id);
      onRefetch();
    }
  };

  return (
    <>
      <HeaderPage
        title="Categoría"
        btnTitle="Nueva Categoría"
        btnClick={addCategory}
      />
      <TableCategoryAdmin
        categories={categories}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
      />
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
 