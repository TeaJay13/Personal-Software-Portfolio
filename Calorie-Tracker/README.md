# Overview

This project is a Calorie Tracker Application designed to enhance my software engineering skills by working with Python and an SQLite relational database. The purpose of this project is to create a CRUD (Create, Read, Update, Delete) application that allows users to track their daily calorie intake by logging meals and their respective calorie counts.

The program integrates seamlessly with an SQLite relational database to store and manage data persistently. Users can add meals, view all logged entries, update or delete specific entries, and calculate the total calories consumed on a particular day or over the last week.

To use the program:

Run the main.py file to launch the application.
Follow the on-screen menu to add, view, update, delete, or calculate calorie data.
The data is stored and retrieved from the SQLite database (calorie.db), ensuring persistence between sessions.
The goal of this project was to develop practical experience with relational databases and Python, focusing on efficient data handling and user interaction.

[Software Demo Video](http://youtube.link.goes.here)

# Relational Database

The application uses an SQLite relational database named calorie.db.

Structure of the Database:

Table Name: calorie_tracker
id (INTEGER PRIMARY KEY): A unique identifier for each entry.
date (TEXT): The date of the meal, stored in YYYY-MM-DD format.
meal (TEXT): A description of the meal or food item.
calories (INTEGER): The calorie count of the meal.
This structure allows for efficient storage and querying of meal data, supporting various operations like summing up calories and retrieving entries by date.

# Development Environment

Development Tools:

Python
SQLite (built into Python for database handling)
VS Code (Visual Studio Code) for code editing
Terminal/Command Prompt for running the application
Programming Language:

Python 3. The program leverages standard libraries like sqlite3 for database operations.

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [SQLite Tutorial](https://www.sqlitetutorial.net/)  
- [Python SQLite3 Documentation](https://docs.python.org/3.8/library/sqlite3.html)  
- [Python Modules - Programiz](https://www.programiz.com/python-programming/modules)  
- [CRUD Operations in Python SQLite - GeeksforGeeks](https://www.geeksforgeeks.org/python-sqlite-crud-operations/)  
- [Python SQLite - W3Schools](https://www.w3schools.com/python/)  

# Future Work

Add user authentication to track calorie logs for multiple users.
Implement data visualization using libraries like Matplotlib to display trends in calorie consumption.
Create a graphical user interface (GUI) with Tkinter or PyQt for better user experience.
Add input validation to ensure correct data formats (e.g., valid dates, non-negative calorie counts).
Expand reporting features, such as monthly calorie summaries or comparisons over time.