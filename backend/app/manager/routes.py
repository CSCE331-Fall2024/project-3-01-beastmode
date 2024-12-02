from . import manager_bp
from flask import request, jsonify
from sqlalchemy import text
from app.extensions import db

newZ=False
zLeave=False
startDatePair="2024-09-23 00:00:00"
endDatePair="2024-09-23 00:00:00"

def date_pull():
    global newZ
    global zLeave
    #date
    currDate=db.session.execute(
    text("""SELECT order_date_time FROM "order" WHERE order_id = (SELECT max(order_id) FROM "order");""")
    ).fetchall()

    data=request.data.decode("utf-8")
    if (data=="Z"):
         newZ=True
    if (data=="LEAVE"):
         zLeave=True
    if newZ and zLeave:
        queryTime=str(currDate[0][0])
    else:
        queryTime=str(currDate[0][0])[0:10] + " 00:00:00"
    return queryTime

@manager_bp.route('/xzreports', methods=['GET','POST'])
def xreports_data():
    queryTime=date_pull()
    currDay=queryTime[5:10]  + "-" + queryTime[0:4]
    currHour=int(queryTime[11:13])-9
    
    
    #Total sales
    dailySales= db.session.execute(
    text(f"""SELECT SUM(total_price) FROM "order" WHERE order_date_time > '{queryTime}';""")
    ).fetchall()
    
    #total orders
    sales="$" + str(dailySales[0][0])

    ordersQuery= db.session.execute(
    text(f"""SELECT COUNT(order_id) FROM "order" WHERE order_date_time > '{queryTime}';""")
    ).fetchall()
    orderNum=str(ordersQuery[0][0])
    if (int(orderNum)==0):
        currDay=""
        currHour=""
        sales=""
        orderNum=""
    #Orders by hour for table
    ordersQuery= db.session.execute(
    text(f"""
         SELECT DATE_PART('hour',order_date_time), count(order_id), sum(total_price)
        FROM "order" WHERE order_date_time > '{queryTime}'
        GROUP BY DATE_PART('hour',order_date_time) 
        ORDER BY DATE_PART('hour', order_date_time)
         ;""")
    ).fetchall()
    ordersByHour=[]
    dataArr=[]
    rowArr=[]
    chartArr=[]
    chartDict={}
    totSales=0
    for row in ordersQuery:
        rowArr=[]
        chartDict={}
        for i in range (0,3):
            if (i==0):
                if (int(row[i])<12):
                    rowArr+=[str(int(row[i])) + ":00 AM"]
                    chartDict["hour"]=rowArr[0]
                elif (int(row[i])==12):
                    rowArr+=[str(int(row[i])) + ":00 PM"]
                    chartDict["hour"]=rowArr[0]
                else:
                    rowArr+=[str(int(row[i])-12) + ":00 PM"]
                    chartDict["hour"]=rowArr[0]
            elif (i==1):
                rowArr+=[str(int(row[i])) + " "]
                
            else:
                 rowArr+=[ "$" + str(row[i])]
                 totSales=float(row[i])
                 chartDict["sales"]=totSales
        chartArr+=[chartDict]
        ordersByHour+=[rowArr]
        #print(ordersByHour)
    #Top products
    productsQuery= db.session.execute(
    text(f""" SELECT product_name, COUNT(product_name) FROM "order" o 
         LEFT JOIN order_menu_item om ON o.order_id=om.order_id 
         LEFT JOIN order_menu_item_product p ON om.order_menu_item_id=p.order_menu_item_id 
         JOIN product_item pi ON p.product_id=pi.product_id 
         WHERE order_date_time > '{queryTime}' 
         GROUP BY (product_name) ORDER BY count(product_name) DESC LIMIT 5;
         """)
    ).fetchall()
    
    pieArr=[]
    pieDict={}
    newName=""
    for row in productsQuery:
        newName=""
        for char in row[0]:
            if (str(char).isupper()):
                newName+=" "
                newName+=char
            else:
                newName+=char
        newNameFinal=newName[0].upper() + newName[1:]
        pieDict["name"]=newNameFinal
        pieDict["value"]=int(row[1])
        pieArr+=[pieDict]
        pieDict={}
   
    returnDict={"date":currDay, 
                "hour":currHour,
                "sales":sales,
                "orderNum":orderNum,
                "ordersByHour":ordersByHour,
                "chartArr":chartArr,
                "pieArr": pieArr
                }
    return returnDict

@manager_bp.route('/pairreports', methods=['GET','POST'])
def pair_reports():
    
    data=request.data.decode("utf-8")
    global startDatePair
    global endDatePair
    if (data[2:7]=='sDate'):
        startDatePair=data[10:29]
    if (data[2:7]=='eDate'):
        endDatePair=data[10:29]
    
    pairProductChart=db.session.execute(
    text(f"""
        SELECT count(DISTINCT o.order_id), pi1.product_name, pi2.product_name, pi1.product_id,pi2.product_id
        FROM "order" o 
        JOIN order_menu_item om1 ON o.order_id=om1.order_id 
        JOIN order_menu_item om2 ON o.order_id=om2.order_id 
        JOIN order_menu_item_product p1 ON om1.order_menu_item_id=p1.order_menu_item_id 
        JOIN order_menu_item_product p2 ON om2.order_menu_item_id=p2.order_menu_item_id 
        JOIN product_item pi1 ON p1.product_id=pi1.product_id 
        JOIN product_item pi2 ON p2.product_id=pi2.product_id 
        WHERE o.order_date_time >  '{startDatePair}'
        AND o.order_date_time <  '{endDatePair}'
        GROUP BY pi1.product_id, pi2.product_id
        ORDER BY pi1.product_id DESC;
        """)
    ).fetchall()
    pairProductsTable=db.session.execute(
    text(f"""
        SELECT count(DISTINCT o.order_id), pi1.product_name, pi2.product_name
        FROM "order" o 
        JOIN order_menu_item om1 ON o.order_id=om1.order_id 
        JOIN order_menu_item om2 ON o.order_id=om2.order_id 
        JOIN order_menu_item_product p1 ON om1.order_menu_item_id=p1.order_menu_item_id 
        JOIN order_menu_item_product p2 ON om2.order_menu_item_id=p2.order_menu_item_id 
        JOIN product_item pi1 ON p1.product_id=pi1.product_id 
        JOIN product_item pi2 ON p2.product_id=pi2.product_id 
        WHERE pi1.product_id < pi2.product_id
        AND o.order_date_time >  '{startDatePair}'
        AND o.order_date_time <  '{endDatePair}'
        GROUP BY pi1.product_id, pi2.product_id
        ORDER BY count(DISTINCT o.order_id) DESC LIMIT 10;
        """)
    ).fetchall()
    
    totalOrders=db.session.execute(
    text(f"""
        SELECT count(DISTINCT order_id)
        FROM "order"
        WHERE order_date_time >  '{startDatePair}'
        AND order_date_time <  '{endDatePair}';
        """)
    ).fetchall()

    prodNamesQuery=db.session.execute(
    text(f"""
         SELECT product_name from product_item
         ORDER By product_id;
        """)
    ).fetchall()
    tableArr=[]
  
    for i in range(len(pairProductsTable)):
        rowArr=[]
        newName=""
        for char in str(str(pairProductsTable[i][1])):
            if (str(char).isupper()):
                newName+=" "
                newName+=char
            else:
                newName+=char
        newNameFinal=newName[0].upper() + newName[1:]
        rowArr+=[newNameFinal]
        newName=""
        for char in str(str(pairProductsTable[i][2])):
            if (str(char).isupper()):
                newName+=" "
                newName+=char
            else:
                newName+=char
        newNameFinal=newName[0].upper() + newName[1:]
        rowArr+=[newNameFinal]
        rowArr+=[str(pairProductsTable[i][0])]
        rowArr+=[str(round(float(pairProductsTable[i][0])/float(totalOrders[0][0])*100)) + "%"]
        tableArr+=[rowArr]

    productsArr=[]
    productsArrReverse=[]
    prodNums=len(prodNamesQuery)
    for i in range(prodNums):
        newName=""
        for char in str(prodNamesQuery[i][0]):
            if (str(char).isupper()):
                newName+=" "
                newName+=char
            else:
                newName+=char
        newNameFinal=newName[0].upper() + newName[1:]
        productsArr+=[newNameFinal]
        newName=""
        for char in str(prodNamesQuery[prodNums-1-i][0]):
            if (str(char).isupper()):
                newName+=" "
                newName+=char
            else:
                newName+=char
        newNameFinal=newName[0].upper() + newName[1:]
        productsArrReverse+=[newNameFinal]
       

    
    crossPlotArr=[[0]*prodNums for _ in range(prodNums)]
    maxPair=0
    for i in range (0,len(pairProductChart)):
        if(int(pairProductChart[i][3])==int(pairProductChart[i][4])):
            crossPlotArr[prodNums-int(pairProductChart[i][3])][int(pairProductChart[i][4])-1]='0'
        else:
            crossPlotArr[prodNums-int(pairProductChart[i][3])][int(pairProductChart[i][4])-1]=pairProductChart[i][0]
            if (int(pairProductChart[i][0])>maxPair):
                maxPair=int(pairProductChart[i][0])
    return {"pairChart":crossPlotArr,
            "maxPair": str(maxPair),
            "productsArr":productsArr,
            "productsArrReverse":productsArrReverse,
            "tableArr":tableArr
            }