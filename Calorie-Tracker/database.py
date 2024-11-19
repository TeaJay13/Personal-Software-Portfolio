import sqlite3

# Function to create the database and table
def create_database():
    conn = sqlite3.connect('calorie.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS calorie_tracker
                      (id INTEGER PRIMARY KEY, date TEXT, meal TEXT, calories INTEGER)''')
    conn.commit()
    conn.close()

# Function to get a database connection
def get_connection():
    return sqlite3.connect('calorie.db')
