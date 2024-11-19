from database import get_connection

# Function to add to the database
def add_entry(date, meal, calories):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO calorie_tracker (date, meal, calories) VALUES (?, ?, ?)', (date, meal, calories))
    conn.commit()
    conn.close()

# Function to view all entries from the database
def view_entries():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM calorie_tracker')
    entries = cursor.fetchall()
    conn.close()
    return entries

# Function to delete an entry from the database
def delete_entry(entry_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM calorie_tracker WHERE id = ?', (entry_id,))
    conn.commit()
    conn.close()

# Function to update an entry in the database
def update_entry(entry_id, date, meal, calories):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE calorie_tracker SET date = ?, meal = ?, calories = ? WHERE id = ?', (date, meal, calories, entry_id))
    conn.commit()
    conn.close()

# Function to get a single entry from the database
def get_entry(entry_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM calorie_tracker WHERE id = ?', (entry_id,))
    entry = cursor.fetchone()
    conn.close()
    return entry

# Function to get the total calories consumed in a day
def get_total_calories(date):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(calories) FROM calorie_tracker WHERE date = ?', (date,))
    total_calories = cursor.fetchone()[0] or 0  # Return 0 if no entries
    conn.close()
    return total_calories

# Function to get the total calories consumed in a week
def get_weekly_calories():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT SUM(calories) FROM calorie_tracker WHERE date >= date("now", "-7 days")')
    weekly_total = cursor.fetchone()[0] or 0  # Return 0 if no entries
    conn.close()
    return weekly_total
