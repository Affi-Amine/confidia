import os
import pyodbc
import json
from django.conf import settings

# Create a connection string from the database settings
conn_str = f"DRIVER={settings.DATABASES['default']['OPTIONS']['driver']};"
conn_str += f"SERVER={settings.DATABASES['default']['HOST']},{settings.DATABASES['default']['PORT']};"
conn_str += f"DATABASE={settings.DATABASES['default']['NAME']};"
conn_str += f"UID={settings.DATABASES['default']['USER']};"
conn_str += f"PWD={settings.DATABASES['default']['PASSWORD']}"

# Connect to the Azure SQL database
conn = pyodbc.connect(conn_str)

# Define the path to your JSON file
json_file_path = 'backend/Users.json'

# Define the table name to insert data into
table_name = 'your_final_table_name'

# Load the JSON data from the file
with open(json_file_path, 'r') as f:
    data = json.load(f)

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create the table if it doesn't exist
cursor.execute(f"""
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '{table_name}')
    CREATE TABLE {table_name} (
        id_user VARCHAR(255),
        email VARCHAR(255),
        created_at DATETIME,
        updated_at DATETIME,
        github VARCHAR(255),
        image VARCHAR(255),
        name VARCHAR(255),
        pays VARCHAR(255),
        phone VARCHAR(255),
        projects VARCHAR(255),
        surname VARCHAR(255)
    );
""")

# Insert data into the table
for item in data:
    # Define the insert query with placeholders for values
    insert_query = f"""
        INSERT INTO {table_name} (
            id_user, email, created_at, updated_at, github, image, name, pays, phone, projects, surname
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    """
    # Execute the insert query with the actual values
    cursor.execute(insert_query, (
        item['id_user'], item['email'], item['created_at'], item['updated_at'],
        item['github'], item['image'], item['name'], item['pays'], item['phone'],
        ', '.join(item['projects']), item['surname']
    ))

# Commit the changes
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()