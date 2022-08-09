import React, { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { size } from "lodash";
import classNames from "classnames";
import { getOrdersByTableApi } from "../../../../api/orders";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import { ORDER_STATUS } from "../../../../utils/constants";
import { usePayment } from "../../../../hooks";
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table, reload } = props;
  const [orders, setOrders] = useState([]);
  const [TableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  const { getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const orders = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING);
      setOrders(orders);
    })();
    // eslint-disable-next-line
  }, [reload]);

  useEffect(() => {
    (async () => {
      const orders = await getOrdersByTableApi(
        table.id,
        ORDER_STATUS.DELIVERED
      );
      if (size(orders) > 0) {
        setTableBusy(orders);
      } else {
        setTableBusy(false);
      }
    })();
    // eslint-disable-next-line
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
    // eslint-disable-next-line
  }, [reload]);

  return (
    <Link className="table-admin" to={`/admin/table/${table.id}`}>
      {size(orders) > 0 ? (
        <Label circular color="orange">
          {size(orders)}
        </Label>
      ) : null}

      {pendingPayment && (
        <Label circular color="orange">
          Cuenta
        </Label>
      )}

      <IcTable
        className={classNames({
          pending: size(orders) > 0,
          busy: TableBusy,
          'pendingPayment': pendingPayment
        })}
      />
      <p>Mesa {table.number}</p>
    </Link>
  );
}
