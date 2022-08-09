import React, { useEffect, useState, useCallback } from "react";
import { Form, Image, Button, Dropdown, Checkbox } from "semantic-ui-react";
import { map } from "lodash";
import "./AddEditProductForm.scss";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProduct, useCategory } from "../../../../hooks";

export function AddEditProductForm(props) {
  const { onClose, onRefetch, product } = props;
  const { categories, getCategories } = useCategory();
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(product?.image || null);
  const { addProduct, updateProduct } = useProduct();

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCategoriesFormat(formatDropDown(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(product ? updateSchema() : newSchema()),
    validationOnChange: false,
    onSubmit: async (formValue) => {
      if (product) {
        await updateProduct(product.id, formValue);
      } else {
        await addProduct(formValue);
      }
      onRefetch();
      onClose();
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
    // eslint-disable-next-line
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del Producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        name="price"
        type="number"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="Categoría"
        name="category"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />
      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          label="Activo"
          name="active"
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
      </div>
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Actualizar Imagen" : "Subir Imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />
      <Button
        type="submit"
        content={product ? "Actualizar" : "Crear Producto"}
        primary
        fluid
      />
    </Form>
  );
}

function formatDropDown(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active || false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required("El nombre del producto es requerido"),
    price: Yup.number().required("El precio del producto es requerido"),
    category: Yup.string().required("La categoría del producto es requerida"),
    active: Yup.boolean().required("El estado del producto es requerido"),
    image: Yup.string().required("La imagen del producto es requerida"),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required("El nombre del producto es requerido"),
    price: Yup.number().required("El precio del producto es requerido"),
    category: Yup.string().required("La categoría del producto es requerida"),
    active: Yup.boolean().required("El estado del producto es requerido"),
  };
}
  