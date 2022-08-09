import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import { ORDER_STATUS } from '../../../../utils/constants';
import { useOrder } from '../../../../hooks';
import classNames from 'classnames';
import moment from 'moment';
import './OrderItem.scss';


export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { setDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await setDeliveredOrder(order.id);
    onReloadOrders();
  }

  return (
    <div className={classNames('order-item-admin', {
      [order.status.toLowerCase()]: true,
    })}>
        <div className='order-item-admin__time'>
          <span>{moment(order.created_at).format('HH:mm')}</span> {' - '}
          <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
        </div>

        <div className='order-item-admin__product'>
          <Image src={order.product_data.image} />
          <p>{order.product_data.title}</p>
        </div>

        {order.status === ORDER_STATUS.PENDING && (
          <Button primary onClick={onCheckDeliveredOrder}>
            Marcar como Entregado
          </Button>
        )}
    </div>
  )
}
