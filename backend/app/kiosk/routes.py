from . import kiosk_bp
from flask import request, jsonify
from sqlalchemy import text
from app.extensions import db

from app.models import Order, OrderMenuItem, OrderMenuItemProduct, MenuItem, ProductItem, Employee
from datetime import datetime, timezone

@kiosk_bp.route('/', methods=['GET'])
def customer_kiosk_home():
    """
    Home endpoint for the Customer Kiosk.
    ---
    tags:
      - Kiosk
    responses:
      200:
        description: Welcome message for the Customer Kiosk.
    """
    return {"message": "Welcome to the Customer Kiosk"}


@kiosk_bp.route('/menu', methods=['GET'])
def get_menu_items():
    """
    Retrieve menu items.
    ---
    tags:
      - Kiosk
      - Menu
    responses:
      200:
        description: A list of menu items.
    """
    single_appetizer = db.session.execute(
        text("SELECT * FROM menu_item WHERE item_name = 'appetizerSmall' LIMIT 1")
    ).fetchall()

    single_a_la_carte = db.session.execute(
        text("SELECT * FROM menu_item WHERE item_name = 'aLaCarteSideMedium' LIMIT 1")
    ).fetchall()

    single_drink = db.session.execute(
        text("SELECT * FROM menu_item WHERE item_name = 'drink' LIMIT 1")
    ).fetchall()

    all_other_items = db.session.execute(
        text("""
            SELECT * FROM menu_item 
            WHERE item_name NOT LIKE 'appetizer%' 
            AND item_name NOT LIKE 'dessert%' 
            AND item_name NOT LIKE 'aLaCarte%'
            AND item_name NOT LIKE 'drink%'
            ORDER BY menu_item_id ASC
        """)
    ).fetchall()

    menu_items = all_other_items + single_a_la_carte + single_appetizer + single_drink

    menu_items_list = [
        {
            "menu_item_id": menu_item.menu_item_id,
            "item_name": menu_item.item_name,
            "max_entrees": menu_item.max_entrees,
            "max_sides": menu_item.max_sides,
            "menu_item_base_price": menu_item.menu_item_base_price,
            "premium_multiplier": menu_item.premium_multiplier,
            "menu_item_description": menu_item.menu_item_description,
            "calories": menu_item.calories,
            "image": menu_item.image,
        }
        for menu_item in menu_items
    ]

    return jsonify(menu_items_list), 200


@kiosk_bp.route('/sides', methods=['GET'])
def get_sides():
    """
    Retrieve sides.
    ---
    tags:
      - Kiosk
      - Menu
    responses:
      200:
        description: A list of side items.
    """
    sides = db.session.execute(
        text("SELECT * FROM product_item WHERE type = :type ORDER BY product_id ASC"), 
        {'type': 'side'}
    ).fetchall()

    sides_list = [
        {
            "product_id": side.product_id,
            "product_name": side.product_name,
            "type": side.type,
            "is_seasonal": side.is_seasonal,
            "is_available": side.is_available,
            "servings_remaining": side.servings_remaining,
            "allergens": side.allergens,
            "display_icons": side.display_icons,
            "product_description": side.product_description,
            "premium_addition": side.premium_addition,
            "serving_size": side.serving_size,
            "calories": side.calories,
            "saturated_fat": side.saturated_fat,
            "carbohydrate": side.carbohydrate,
            "protein": side.protein,
            "image": side.image,
            "is_premium": side.is_premium,
        }
        for side in sides
    ]

    return jsonify(sides_list), 200


@kiosk_bp.route('/entrees', methods=['GET'])
def get_entrees():
    """
    Retrieve entrees.
    ---
    tags:
      - Kiosk
      - Menu
    responses:
      200:
        description: A list of entree items.
    """
    entrees = db.session.execute(
        text("SELECT * FROM product_item WHERE type = :type ORDER BY product_id ASC"), 
        {'type': 'entree'}
    ).fetchall()

    entrees_list = [
        {
            "product_id": entree.product_id,
            "product_name": entree.product_name,
            "type": entree.type,
            "is_seasonal": entree.is_seasonal,
            "is_available": entree.is_available,
            "servings_remaining": entree.servings_remaining,
            "allergens": entree.allergens,
            "display_icons": entree.display_icons,
            "product_description": entree.product_description,
            "premium_addition": entree.premium_addition,
            "serving_size": entree.serving_size,
            "calories": entree.calories,
            "saturated_fat": entree.saturated_fat,
            "carbohydrate": entree.carbohydrate,
            "protein": entree.protein,
            "image": entree.image,
            "is_premium": entree.is_premium,
        }
        for entree in entrees
    ]

    return jsonify(entrees_list), 200


@kiosk_bp.route('/drinks', methods=['GET'])
def get_drinks():
    """
    Retrieve drinks.
    ---
    tags:
      - Kiosk
      - Menu
    responses:
      200:
        description: A list of drink items.
    """
    fountain_drinks = db.session.execute(
        text("SELECT * FROM product_item WHERE type = :type ORDER BY product_id ASC"), 
        {'type': 'fountainDrink'}
    ).fetchall()

    fountain_drinks_list = [
        {
            "product_id": fountain_drink.product_id,
            "product_name": fountain_drink.product_name,
            "type": fountain_drink.type,
            "is_seasonal": fountain_drink.is_seasonal,
            "is_available": fountain_drink.is_available,
            "servings_remaining": fountain_drink.servings_remaining,
            "allergens": fountain_drink.allergens,
            "display_icons": fountain_drink.display_icons,
            "product_description": fountain_drink.product_description,
            "premium_addition": fountain_drink.premium_addition,
            "serving_size": fountain_drink.serving_size,
            "calories": fountain_drink.calories,
            "saturated_fat": fountain_drink.saturated_fat,
            "carbohydrate": fountain_drink.carbohydrate,
            "protein": fountain_drink.protein,
            "image": fountain_drink.image,
            "is_premium": fountain_drink.is_premium,
        }
        for fountain_drink in fountain_drinks
    ]

    drinks = db.session.execute(
        text("SELECT * FROM product_item WHERE type = :type1 OR type = :type2 ORDER BY product_id ASC"), 
        {'type1': 'drink', 'type2': 'fountainDrink'}
    ).fetchall()

    drinks_list = [
        {
            "product_id": drink.product_id,
            "product_name": drink.product_name,
            "type": drink.type,
            "is_seasonal": drink.is_seasonal,
            "is_available": drink.is_available,
            "servings_remaining": drink.servings_remaining,
            "allergens": drink.allergens,
            "display_icons": drink.display_icons,
            "product_description": drink.product_description,
            "premium_addition": drink.premium_addition,
            "serving_size": drink.serving_size,
            "calories": drink.calories,
            "saturated_fat": drink.saturated_fat,
            "carbohydrate": drink.carbohydrate,
            "protein": drink.protein,
            "image": drink.image,
            "is_premium": drink.is_premium,
        }
        for drink in drinks
    ]

    return jsonify(fountain_drinks_list + drinks_list), 200


@kiosk_bp.route('/appetizers', methods=['GET'])
def get_appetizers():
    """
    Retrieve appetizers.
    ---
    tags:
      - Kiosk
      - Menu
    responses:
      200:
        description: A list of appetizer items.
    """
    appetizers = db.session.execute(
        text("SELECT * FROM product_item WHERE type = :type ORDER BY product_id ASC"), 
        {'type': 'appetizer'}
    ).fetchall()

    appetizers_list = [
        {
            "product_id": appetizer.product_id,
            "product_name": appetizer.product_name,
            "type": appetizer.type,
            "is_seasonal": appetizer.is_seasonal,
            "is_available": appetizer.is_available,
            "servings_remaining": appetizer.servings_remaining,
            "allergens": appetizer.allergens,
            "display_icons": appetizer.display_icons,
            "product_description": appetizer.product_description,
            "premium_addition": appetizer.premium_addition,
            "serving_size": appetizer.serving_size,
            "calories": appetizer.calories,
            "saturated_fat": appetizer.saturated_fat,
            "carbohydrate": appetizer.carbohydrate,
            "protein": appetizer.protein,
            "image": appetizer.image,
            "is_premium": appetizer.is_premium,
        }
        for appetizer in appetizers
    ]

    return jsonify(appetizers_list), 200


@kiosk_bp.route('/desserts', methods=['GET'])
def get_desserts():
    """
    Retrieve desserts.
    ---
    tags:
      - Kiosk
      - Menu
    responses:
      200:
        description: A list of dessert items.
    """
    desserts = db.session.execute(
        text("SELECT * FROM product_item WHERE type = :type ORDER BY product_id ASC"), 
        {'type': 'dessert'}
    ).fetchall()

    desserts_list = [
        {
            "product_id": dessert.product_id,
            "product_name": dessert.product_name,
            "type": dessert.type,
            "is_seasonal": dessert.is_seasonal,
            "is_available": dessert.is_available,
            "servings_remaining": dessert.servings_remaining,
            "allergens": dessert.allergens,
            "display_icons": dessert.display_icons,
            "product_description": dessert.product_description,
            "premium_addition": dessert.premium_addition,
            "serving_size": dessert.serving_size,
            "calories": dessert.calories,
            "saturated_fat": dessert.saturated_fat,
            "carbohydrate": dessert.carbohydrate,
            "protein": dessert.protein,
            "image": dessert.image,
            "is_premium": dessert.is_premium,
        }
        for dessert in desserts
    ]

    return jsonify(desserts_list), 200


@kiosk_bp.route('/orders', methods=['POST'])
def create_order():
    """
    Create a new order.
    ---
    tags:
      - Kiosk
      - Orders
    parameters:
      - in: body
        name: order
        description: Details of the order to create.
        required: true
        schema:
          type: object
          properties:
            total_price:
              type: number
              example: 25.50
            cart_items:
              type: array
              items:
                type: object
                properties:
                  name:
                    type: string
                    example: "Orange Chicken Bowl"
                  quantity:
                    type: integer
                    example: 1
                  basePrice:
                    type: number
                    example: 7.50
                  premiumMultiplier:
                    type: number
                    example: 1.2
                  components:
                    type: object
                    properties:
                      sides:
                        type: array
                        items:
                          type: object
                          properties:
                            product_id:
                              type: integer
                              example: 101
                            is_premium:
                              type: boolean
                              example: true
                      entrees:
                        type: array
                        items:
                          type: object
                          properties:
                            product_id:
                              type: integer
                              example: 102
                            is_premium:
                              type: boolean
                              example: false
    responses:
      201:
        description: Order created successfully.
      400:
        description: Invalid order data.
      500:
        description: Internal server error.
    """
    data = request.get_json()
    total_price = data.get('total_price')
    cart_items = data.get('cart_items')

    if not cart_items or not total_price:
        return jsonify({'error': 'Invalid order data'}), 400

    try:
        with db.session.begin_nested():
            order = Order(
                order_date_time=datetime.now(),
                total_price=total_price,
                employee_id=None,
                is_ready=False
            )
            db.session.add(order)
            db.session.flush()

            for cart_item in cart_items:
                name = cart_item.get('name')
                quantity = cart_item.get('quantity', 1)
                base_price = cart_item.get('basePrice')
                premium_multiplier = cart_item.get('premiumMultiplier')
                components = cart_item.get('components')

                # Get the MenuItem by name
                menu_item = MenuItem.query.filter_by(item_name=name).first()
                if not menu_item:
                    return jsonify({'error': f'Menu item "{name}" not found'}), 400

                # Calculate subtotal_price for this cart item
                subtotal_price = get_item_price(cart_item)

                # Create OrderMenuItem entries based on quantity
                for _ in range(quantity):
                    order_menu_item = OrderMenuItem(
                        order_id=order.order_id,
                        menu_item_id=menu_item.menu_item_id,
                        subtotal_price=subtotal_price / quantity
                    )
                    db.session.add(order_menu_item)
                    db.session.flush()

                    # If the item has components, add them
                    if components:
                        # Sides
                        for side in components.get('sides', []):
                            product_id = side.get('product_id')
                            if not product_id:
                                return jsonify({'error': 'Product ID missing in side item'}), 400
                            product = ProductItem.query.get(product_id)
                            if not product:
                                return jsonify({'error': f'Product with ID {product_id} not found'}), 400
                            order_menu_item_product = OrderMenuItemProduct(
                                order_menu_item_id=order_menu_item.order_menu_item_id,
                                product_id=product_id
                            )
                            db.session.add(order_menu_item_product)
                        # Entrees
                        for entree in components.get('entrees', []):
                            product_id = entree.get('product_id')
                            if not product_id:
                                return jsonify({'error': 'Product ID missing in entree item'}), 400
                            product = ProductItem.query.get(product_id)
                            if not product:
                                return jsonify({'error': f'Product with ID {product_id} not found'}), 400
                            order_menu_item_product = OrderMenuItemProduct(
                                order_menu_item_id=order_menu_item.order_menu_item_id,
                                product_id=product_id
                            )
                            db.session.add(order_menu_item_product)
                    else:
                        # For items without components (e.g., drinks, appetizers), link the product directly
                        product_id = cart_item.get('product_id') or cart_item.get('productId')
                        if product_id:
                            product = ProductItem.query.get(product_id)
                            if not product:
                                return jsonify({'error': f'Product with ID {product_id} not found'}), 400
                            order_menu_item_product = OrderMenuItemProduct(
                                order_menu_item_id=order_menu_item.order_menu_item_id,
                                product_id=product_id
                            )
                            db.session.add(order_menu_item_product)

            db.session.commit()
        return jsonify({'message': 'Order created successfully', 'order_id': order.order_id}), 201
    except Exception as e:
        db.session.rollback()
        print('Error creating order:', e)
        return jsonify({'error': 'An error occurred while creating the order.'}), 500


def get_item_price(item):
    quantity = item.get('quantity', 1)
    if 'basePrice' in item and 'premiumMultiplier' in item and 'components' in item:
        # Convert base price and premium multiplier with error handling
        try:
            base_price = float(item.get('basePrice') or 0)
        except ValueError:
            base_price = 0.0
        try:
            premium_multiplier = float(item.get('premiumMultiplier') or 1)
        except ValueError:
            premium_multiplier = 1.0
        components = item['components']
        total_premium_addition = 0.0
        # Sides
        for side in components.get('sides', []):
            is_premium = side.get('is_premium', False)
            if isinstance(is_premium, str):
                is_premium = is_premium.lower() == 'true'
            if is_premium:
                try:
                    premium_addition = float(side.get('premium_addition') or 0)
                except ValueError:
                    premium_addition = 0.0
                total_premium_addition += premium_addition
        # Entrees
        for entree in components.get('entrees', []):
            is_premium = entree.get('is_premium', False)
            if isinstance(is_premium, str):
                is_premium = is_premium.lower() == 'true'
            if is_premium:
                try:
                    premium_addition = float(entree.get('premium_addition') or 0)
                except ValueError:
                    premium_addition = 0.0
                total_premium_addition += premium_addition
        total_price = base_price + premium_multiplier * total_premium_addition
        return round(total_price * quantity, 2)
    elif 'price' in item:
        try:
            return round(float(item.get('price') or 0) * quantity, 2)
        except ValueError:
            return 0.0
    elif 'premium_addition' in item:
        try:
            return round(float(item.get('premium_addition') or 0) * quantity, 2)
        except ValueError:
            return 0.0
    else:
        return 0.0