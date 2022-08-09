import React, { useState, useEffect } from "react";
import { Button, Icon, Checkbox } from "semantic-ui-react";
import { map } from "lodash";
import { TableAdmin } from "../";
import "./TableListAdmin.scss";

export function TableListAdmin(props) {
  const { tables } = props;
  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);
  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };
      autoReloadAction();
    }
    // eslint-disable-next-line
  }, [autoReload]);

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="table-list-admin">
      <Button
        className="table-list-admin__reload"
        primary
        icon
        onClick={onReload}
      >
        <Icon name="refresh" />
      </Button>
      <div className="table-list-admin__reload-toggle">
        <span>
          <strong>Reload Automático</strong>
        </span>
        <Checkbox
          toggle
          checked={autoReload}
          onChange={(_, data) => onCheckAutoReload(data.checked)}
        />
      </div>
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
}
