-- 8) "Revenue by menu item": Calculates the total revenue generated by each menu item
SELECT 
    mi.item_name, 
    SUM(omi.subtotal_price) AS total_revenue
FROM 
    menu_item mi
JOIN 
    order_menu_item omi ON mi.menu_item_id = omi.menu_item_id
GROUP BY 
    mi.item_name
ORDER BY 
    total_revenue DESC;