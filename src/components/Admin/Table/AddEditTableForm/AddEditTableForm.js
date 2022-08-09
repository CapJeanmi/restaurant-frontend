import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddEditTableForm.scss";
import { useTable } from "../../../../hooks";

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table } = props;
  const { addTable, updateTable } = useTable();

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(
      table ? validationSchema() : validationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (table) {
          await updateTable(table.id, formValue);
        } else {
          await addTable(formValue);
        }
        onRefetch();
        onClose();
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="number"
        name="number"
        placeholder="Número de Mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button type="submit" primary fluid>
        {table ? "Editar" : "Crear Mesa"}
      </Button>
    </Form>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function validationSchema() {
  return {
    number: Yup.number().required("El número de mesa es requerido"),
  };
}
