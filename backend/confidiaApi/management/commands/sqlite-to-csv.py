# your_app/management/commands/export_sqlite_to_csv.py

import sqlite3
import os
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Export SQLite database to CSV files'

    def handle(self, *args, **options):
        # Connect to SQLite database
        conn = sqlite3.connect('db.sqlite3')
        cursor = conn.cursor()

        # Get the list of tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()

        # Create output directory if it doesn't exist
        output_dir = 'csv_exports'
        os.makedirs(output_dir, exist_ok=True)

        for table_name in tables:
            table_name = table_name[0]
            output_file = os.path.join(output_dir, f'{table_name}.csv')

            # Export table to CSV
            with open(output_file, 'w') as f:
                cursor.execute(f"SELECT * FROM {table_name};")
                rows = cursor.fetchall()
                columns = [description[0] for description in cursor.description]

                # Write column headers
                f.write(','.join(columns) + '\n')

                # Write data rows
                for row in rows:
                    f.write(','.join(map(str, row)) + '\n')

        # Close the connection
        conn.close()
        self.stdout.write(self.style.SUCCESS('Successfully exported SQLite database to CSV'))