from .extensions import db
from datetime import datetime, timezone

class ProductItem(db.Model):
    __tablename__ = 'product_item'

    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    is_seasonal = db.Column(db.Boolean, nullable=False)
    is_available = db.Column(db.Boolean, nullable=False) 
    servings_remaining = db.Column(db.Float, nullable=False)
    allergens = db.Column(db.String(200), nullable=False)
    display_icons = db.Column(db.Integer, nullable=False)
    product_description = db.Column(db.String(300), nullable=False)
    premium_addition = db.Column(db.Float, nullable=False)
    serving_size = db.Column(db.Float, nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    saturated_fat = db.Column(db.Integer, nullable=False)
    carbohydrate = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(200), nullable=True)
    is_premium = db.Column(db.Boolean, nullable=False)
    quantity_in_cases = db.Column(db.Integer, nullable=False)
    servings_per_case = db.Column(db.Integer, nullable=False)
    cost_per_case = db.Column(db.Integer, nullable=False)
    in_season = db.Column(db.Boolean, nullable=True)

class MenuItem(db.Model):
    __tablename__ = 'menu_item'

    menu_item_id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(50), nullable=False)
    max_entrees = db.Column(db.Integer, nullable=False)
    max_sides = db.Column(db.Integer, nullable=False)
    menu_item_base_price = db.Column(db.Float, nullable=False)
    premium_multiplier = db.Column(db.Integer, nullable=False)
    menu_item_description = db.Column(db.String(300), nullable=False)
    calories = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String(200), nullable=True)

class Customer(db.Model):
    __tablename__ = 'customer_info'
    
    customer_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    beast_points = db.Column(db.Integer, nullable=False)

class Employee(db.Model):
    __tablename__ = 'employee_info'

    employee_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(255), nullable=False)

class Order(db.Model):
    __tablename__ = 'order'

    order_id = db.Column(db.Integer, primary_key=True, index=True)
    order_date_time = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    employee_id = db.Column(db.Integer, db.ForeignKey('employee_info.employee_id'), nullable=True)
    total_price = db.Column(db.Numeric(7, 2), nullable=False)
    is_ready = db.Column(db.Boolean, nullable=True)

    order_menu_items = db.relationship('OrderMenuItem', backref='order', lazy=True, cascade="all, delete-orphan")

class OrderMenuItem(db.Model):
    __tablename__ = 'order_menu_item'

    order_menu_item_id = db.Column(db.Integer, primary_key=True, index=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.order_id'), nullable=False, index=True)
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_item.menu_item_id'), nullable=False)
    subtotal_price = db.Column(db.Numeric(7, 2), nullable=False)

    order_menu_item_products = db.relationship('OrderMenuItemProduct', backref='order_menu_item', lazy=True, cascade="all, delete-orphan")

class OrderMenuItemProduct(db.Model):
    __tablename__ = 'order_menu_item_product'

    order_menu_item_product_id = db.Column(db.Integer, primary_key=True)
    order_menu_item_id = db.Column(db.Integer, db.ForeignKey('order_menu_item.order_menu_item_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product_item.product_id'), nullable=False)

