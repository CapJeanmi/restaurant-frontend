import React, { useEffect } from "react";
import { useCategory } from "../../hooks";
import { ListCategories } from "../../components/Client";

export function Categories() {
  const { categories, getCategories } = useCategory();

  // eslint-disable-next-line
  useEffect(() => {getCategories()}, []);

  return (
    <div>
      <h3>Categorias</h3>
      <ListCategories categories={categories} />
    </div>
  );
}
