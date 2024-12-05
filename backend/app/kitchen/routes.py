from . import kitchen_bp
from flask import request, jsonify
from app.extensions import db
from app.models import Order, OrderMenuItem, OrderMenuItemProduct, MenuItem, ProductItem
from sqlalchemy.orm import joinedload


@kitchen_bp.route('/', methods=['GET'])
def kitchen_display():
    """
    Home endpoint for the Kitchen View.
    ---
    tags:
      - Kitchen
    responses:
      200:
        description: Welcome message for the Kitchen View.
    """
    return {"message": "Welcome to the Kitchen View"}

@kitchen_bp.route('/orders', methods=['GET'])
def get_pending_orders():
    """
    Retrieve all pending orders.
    ---
    tags:
      - Kitchen
      - Orders
    responses:
      200:
        description: A list of pending orders with details.
      500:
        description: Internal server error while fetching orders.
    """
    try:
        pending_orders = Order.query.filter_by(is_ready=False).options(
            joinedload(Order.order_menu_items)
            .joinedload(OrderMenuItem.order_menu_item_products)
        ).all()

        orders_list = []
        for order in pending_orders:
            order_data = {
                'order_id': order.order_id,
                'order_date_time': order.order_date_time.isoformat(),
                'total_price': str(order.total_price),
                'order_menu_items': []
            }

            for omi in order.order_menu_items:
                menu_item = MenuItem.query.get(omi.menu_item_id)
                omi_data = {
                    'order_menu_item_id': omi.order_menu_item_id,
                    'menu_item_name': menu_item.item_name,
                    'subtotal_price': str(omi.subtotal_price),
                    'components': []
                }

                # Get the products (sides and entrees)
                omp_list = OrderMenuItemProduct.query.filter_by(order_menu_item_id=omi.order_menu_item_id).all()
                for omp in omp_list:
                    product = ProductItem.query.get(omp.product_id)
                    component_data = {
                        'product_name': product.product_name,
                        'type': product.type
                    }
                    omi_data['components'].append(component_data)

                order_data['order_menu_items'].append(omi_data)

            orders_list.append(order_data)

        return jsonify(orders_list), 200
    except Exception as e:
        print('Error fetching pending orders:', e)
        return jsonify({'error': 'An error occurred while fetching pending orders.'}), 500

@kitchen_bp.route('/orders/<int:order_id>/ready', methods=['POST'])
def mark_order_ready(order_id):
    """
    Mark an order as ready.
    ---
    tags:
      - Kitchen
      - Orders
    parameters:
      - in: path
        name: order_id
        description: The ID of the order to mark as ready.
        required: true
        schema:
          type: integer
          example: 123
    responses:
      200:
        description: Order successfully marked as ready.
      404:
        description: Order not found.
      500:
        description: Internal server error while updating the order.
    """
    try:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({'error': 'Order not found.'}), 404

        order.is_ready = True
        db.session.commit()
        # Fetch the updated order to confirm it's marked as ready
        updated_order = Order.query.get(order_id)
        if updated_order.is_ready:
            return jsonify({'message': 'Order marked as ready.'}), 200
        else:
            return jsonify({'error': 'Failed to mark order as ready.'}), 500
    except Exception as e:
        print('Error marking order as ready:', e)
        db.session.rollback()
        return jsonify({'error': 'An error occurred while updating the order.'}), 500
