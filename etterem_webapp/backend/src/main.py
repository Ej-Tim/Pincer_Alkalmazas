import pymysql
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request, session
from werkzeug.security import generate_password_hash, check_password_hash

###LOGIN###
@app.route('/')
def home():
	if 'username' in session:
		username = session['username']
		return jsonify({'message' : 'You are already logged in', 'username' : username})
	else:
		resp = jsonify({'message' : 'Unauthorized'})
		resp.status_code = 401
		return resp

@app.route('/login', methods=['POST'])
def login():
	conn = None
	cursor = None
	try:
		_json = request.json
		_username = _json['username']
		_password = _json['password']
		
		# validate the received values
		if _username and _password:
			#check user exists			
			sql = "SELECT * FROM user WHERE username=%s"
			sql_where = (_username)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, sql_where)
			row = cursor.fetchone()
			if row:
				if check_password_hash(row[2], _password):
					session['username'] = row[1]
					return jsonify({'message' : 'You are logged in successfully'})
				else:
					resp = jsonify({'message' : 'Bad Request - invalid password'})
					resp.status_code = 400
					return resp
		else:
			resp = jsonify({'message' : 'Bad Request - invalid credendtials'})
			resp.status_code = 400
			return resp

	except Exception as e:
		print(e)

	finally:
		if cursor and conn:
			cursor.close()
			conn.close()
		
@app.route('/logout')
def logout():
	if 'username' in session:
		session.pop('username', None)
	return jsonify({'message' : 'You successfully logged out'})

###USER###
@app.route('/users')
def get_users():
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, username, password, role_id FROM user")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/user/<int:id>')
def get_user(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, username, password, role_id FROM user WHERE id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/user/add', methods=['POST'])
def add_user():
	conn = None
	cursor = None
	try:
		_json = request.json
		_username = _json['username']
		_role_id = _json['role_id']
		_password = _json['password']
		# validate the received values
		if _username and _role_id and _password and request.method == 'POST':
			#do not save password as a plain text
			_hashed_password = generate_password_hash(_password)
			#_hashed_password = _password
			# save edits
			sql = "INSERT INTO user(username, role_id, password) VALUES(%s, %s, %s)"
			data = (_username, _role_id, _hashed_password)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('User added successfully!')
			resp.status_code = 200
			return resp
		else:			
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()	

@app.route('/user/update', methods=['PUT'])
def update_user():
	conn = None
	cursor = None
	try:
		_json = request.json
		_id = _json['id']
		_username = _json['username']
		_role_id = _json['role_id']
		_password = _json['password']		
		# validate the received values
		if _username and _role_id and _password and _id and request.method == 'PUT':
			#do not save password as a plain text
			_hashed_password = generate_password_hash(_password)
			# save edits
			sql = "UPDATE user SET username=%s, role_id=%s, password=%s WHERE id=%s"
			data = (_username, _role_id, _hashed_password, _id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('User updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()
		
@app.route('/user/delete/<int:id>', methods=['DELETE'])
def delete_user(id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM user WHERE id=%s", (id,))
		conn.commit()
		resp = jsonify('User deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###ROLE###
@app.route('/roles')
def get_roles():
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, name FROM role")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/role/<int:id>')
def get_role(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, name FROM role WHERE id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/role/add', methods=['POST'])
def add_role():
	conn = None
	cursor = None
	try:
		_json = request.json
		_name = _json['name']
		# validate the received values
		if _name and request.method == 'POST':
			#do not save password as a plain text
			sql = "INSERT INTO role(name) VALUES(%s)"
			data = (_name)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Role added successfully!')
			resp.status_code = 200
			return resp
		else:			
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()	

@app.route('/role/update', methods=['PUT'])
def update_role():
	conn = None
	cursor = None
	try:
		_json = request.json
		_id = _json['id']
		_name = _json['name']
		# validate the received values
		if _name and _id and request.method == 'PUT':
			# save edits
			sql = "UPDATE role SET name=%s WHERE id=%s"
			data = (_name, _id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Role updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()
		
@app.route('/role/delete/<int:id>', methods=['DELETE'])
def delete_role(id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM role WHERE id=%s", (id,))
		conn.commit()
		resp = jsonify('Role deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###FOOD###
@app.route('/foods')
def get_foods():
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, name, price, category_id FROM food")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/food/<int:id>')
def get_food(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, name, price, category_id FROM food WHERE id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/food/add', methods=['POST'])
def add_food():
	conn = None
	cursor = None
	try:
		_json = request.json
		_name = _json['name']
		_price = _json['price']
		_category_id = _json['category_id']
		# validate the received values
		if _name and _price and _category_id and  request.method == 'POST':
			sql = "INSERT INTO food(name, price, category_id) VALUES(%s, %s, %s)"
			data = (_name, _price, _category_id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Food added successfully!')
			resp.status_code = 200
			return resp
		else:			
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()	

@app.route('/food/update', methods=['POST'])
def update_food():
	conn = None
	cursor = None
	try:
		_json = request.json
		_id = _json['id']
		_name = _json['name']
		_price = _json['price']
		_category_id = _json['category_id']
		# validate the received values
		if _name and _price and _category_id and _id and request.method == 'POST':
			# save edits
			sql = "UPDATE food SET name=%s, price=%s, category_id=%s WHERE id=%s"
			data = (_name, _price, _category_id, _id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Food updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/food/delete/<int:id>', methods=['DELETE'])
def delete_food(id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM food WHERE id=%s", (id,))
		conn.commit()
		resp = jsonify('Food deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###CATEGORY###
@app.route('/categories')
def get_categories():
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, name FROM category")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/category/<int:id>')
def get_category(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, name FROM category WHERE id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/category/add', methods=['POST'])
def add_category():
	conn = None
	cursor = None
	try:
		_json = request.json
		_name = _json['name']
		# validate the received values
		if _name and request.method == 'POST':
			sql = "INSERT INTO category(name) VALUES(%s)"
			data = (_name)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Category added successfully!')
			resp.status_code = 200
			return resp
		else:			
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()	

@app.route('/category/update', methods=['POST'])
def update_category():
	conn = None
	cursor = None
	try:
		_json = request.json
		_id = _json['id']
		_name = _json['name']
		# validate the received values
		if _name and _id and request.method == 'POST':
			# save edits
			sql = "UPDATE category SET name=%s WHERE id=%s"
			data = (_name, _id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Category updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/category/delete/<int:id>', methods=['DELETE'])
def delete_category(id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM category WHERE id=%s", (id,))
		conn.commit()
		resp = jsonify('Category deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###TABLE_ORDER###
@app.route('/table_orders')
def get_table_orders():
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, reserve FROM table_order")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/table_order/<int:id>')
def get_table_order(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, reserve FROM table_order WHERE id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/table_order/add', methods=['POST'])
def add_table_order():
	conn = None
	cursor = None
	try:
		_json = request.json
		_reserve = _json['reserve']
		# validate the received values
		if _reserve and request.method == 'POST':
			sql = "INSERT INTO table_order(reserve) VALUES(%s)"
			data = (_reserve)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Table_order added successfully!')
			resp.status_code = 200
			return resp
		else:			
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()	

@app.route('/table_order/update', methods=['POST'])
def update_table_order():
	conn = None
	cursor = None
	try:
		_json = request.json
		_id = _json['id']
		_reserve = _json['reserve']
		# validate the received values
		if _reserve and _id and request.method == 'POST':
			# save edits
			sql = "UPDATE table_order SET reserve=%s WHERE id=%s"
			data = (_reserve, _id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Table_order updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/table_order/delete/<int:id>', methods=['DELETE'])
def delete_table_order(id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM table_order WHERE id=%s", (id))
		conn.commit()
		resp = jsonify('Table_order deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###FOOD_ORDER###
@app.route('/food_orders')
def get_food_orders():
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, table_order_id, food_id FROM food_order")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/food_order/<int:id>')
def get_food_order(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT id, table_order_id, food_id FROM food_order WHERE id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/food_order/add', methods=['POST'])
def add_food_order():
	conn = None
	cursor = None
	try:
		_json = request.json
		_table_order_id = _json['table_order_id']
		_food_id = _json['food_id']
		# validate the received values
		if _table_order_id and _food_id and request.method == 'POST':
			sql = "INSERT INTO food_order(table_order_id, food_id) VALUES(%s, %s)"
			data = (_table_order_id, _food_id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Food_order added successfully!')
			resp.status_code = 200
			return resp
		else:			
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()	

@app.route('/food_order/update', methods=['POST'])
def update_food_order():
	conn = None
	cursor = None
	try:
		_json = request.json
		_id = _json['id']
		_table_order_id = _json['table_order_id']
		_food_id = _json['food_id']
		# validate the received values
		if _table_order_id and _food_id and _id and request.method == 'POST':
			# save edits
			sql = "UPDATE food_order SET table_order_id=%s, food_id=%s WHERE id=%s"
			data = (_table_order_id, _food_id, _id)
			conn = mysql.connect()
			cursor = conn.cursor()
			cursor.execute(sql, data)
			conn.commit()
			resp = jsonify('Food_order updated successfully!')
			resp.status_code = 200
			return resp
		else:
			return not_found()
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/food_order/delete/<int:id>', methods=['DELETE'])
def delete_food_order(id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM food_order WHERE id=%s", (id))
		conn.commit()
		resp = jsonify('Food_order deleted successfully!')
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###TABELFOOD###
@app.route('/tables/foods')
def get_tablesFoods():
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("select food.id, food.name, food.category_id from food_order join food on food_order.food_id = food.id")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp

	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

@app.route('/table/<int:table_order_id>/foods')
def get_tableFoods(table_order_id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("select food.id, food.name, food.category_id from food_order join food on food_order.food_id = food.id where table_order_id=%s", table_order_id)
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp

	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###CATEGORYFOOD###
@app.route('/category/<int:category_id>/foods')
def get_categoryFoods(category_id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("select food.id, food.name, food.category_id from food join category on food.category_id = category.id where category.id = %s", category_id)
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp

	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###ROLE_IDUSER###
@app.route('/role/<int:role_id>/users')
def get_roleUsers(role_id):
	conn = None
	cursor = None
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("select user.id, user.username, user.role_id from user join role on user.role_id = role.id where role.id = %s", role_id)
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp

	except Exception as e:
		print(e)
	finally:
		if cursor and conn:
			cursor.close()
			conn.close()

###ERROR###
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp
		
if __name__ == "__main__":
    app.run()