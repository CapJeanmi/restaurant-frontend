import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProduct, useOrder } from "../../../../hooks";
import { Form, Image, Button, Dropdown } from "semantic-ui-react";
import "./AddOrderForm.scss";

export function AddOrderForm(props) {
  const { openCloseModal, idTable, onReloadOrders } = props;
  const { addOrderToTable } = useOrder();
  const { products, getProducts, getProductById } = useProduct();
  const [productsDropdown, setProductsDropdown] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setProductsDropdown(formatDropdownData(products));
    // eslint-disable-next-line
  }, [products]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      for await (const idProduct of formValue.products) {
        await addOrderToTable(idTable, idProduct);
      }
      onReloadOrders();
      openCloseModal();
    },
  });

  useEffect(() => {
    addProductList();
    // eslint-disable-next-line
  }, [formik.values]);

  const addProductList = async () => {
    try {
      const productsId = formik.values.products;
      const arrayTemp = [];
      for await (const idProduct of productsId) {
        const response = await getProductById(idProduct);
        arrayTemp.push(response);
      }
      setProductsData(arrayTemp);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
      <Dropdown
        placeholder="Productos"
        fluid
        selection
        search
        options={productsDropdown}
        value={null}
        onChange={(_, data) =>
          formik.setFieldValue("products", [
            ...formik.values.products,
            data.value,
          ])
        }
      />
      <div className="add-order-form__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <Button
              type="button"
              content="Eliminar"
              onClick={() =>
                formik.setFieldValue(
                  "products",
                  formik.values.products.filter((id) => id !== product.id)
                )
              }
            />
          </div>
        ))}
      </div>
      <Button type="submit" primary fluid>
        Añadir Productos a la Mesa
      </Button>
    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues() {
  return {
    products: [],
  };
}

function validationSchema() {
  return {
    products: Yup.array().required("Seleccione un producto"),
  };
}
