from crud import add_entry, view_entries, delete_entry, update_entry, get_total_calories, get_weekly_calories
from database import create_database

def main_menu():
    """Displays the main menu and handles user input."""
    while True:
        print("\n===== Calorie Tracker Menu =====")
        print("1. Add Entry")
        print("2. View All Entries")
        print("3. Update an Entry")
        print("4. Delete an Entry")
        print("5. View Total Calories for a Day")
        print("6. View Total Calories for the Last Week")
        print("7. Exit")
        choice = input("Choose an option: ")

        if choice == '1':
            # Add entry
            date = input("Enter the date (YYYY-MM-DD): ")
            meal = input("Enter the meal/food item: ")
            try:
                calories = int(input("Enter the calorie amount: "))
                add_entry(date, meal, calories)
                print(f"Entry added: {date}, {meal}, {calories} calories")
            except ValueError:
                print("Error: Calories must be a number.")
        elif choice == '2':
            # View all entries
            entries = view_entries()
            if entries:
                print("\nID | Date       | Meal           | Calories")
                print("--------------------------------------------")
                for entry in entries:
                    print(f"{entry[0]:<3}| {entry[1]:<10} | {entry[2]:<15} | {entry[3]:<8}")
            else:
                print("No entries found.")
        elif choice == '3':
            # Update an entry
            try:
                entry_id = int(input("Enter the ID of the entry to update: "))
                date = input("Enter the new date (YYYY-MM-DD): ")
                meal = input("Enter the new meal/food item: ")
                calories = int(input("Enter the new calorie amount: "))
                update_entry(entry_id, date, meal, calories)
                print(f"Entry ID {entry_id} updated.")
            except ValueError:
                print("Error: ID and calories must be numbers.")
        elif choice == '4':
            # Delete an entry
            try:
                entry_id = int(input("Enter the ID of the entry to delete: "))
                delete_entry(entry_id)
                print(f"Entry ID {entry_id} deleted.")
            except ValueError:
                print("Error: ID must be a number.")
        elif choice == '5':
            # View total calories for a day
            date = input("Enter the date (YYYY-MM-DD): ")
            total = get_total_calories(date)
            print(f"Total calories consumed on {date}: {total}")
        elif choice == '6':
            # View total calories for the last week
            weekly_total = get_weekly_calories()
            print(f"Total calories consumed in the last 7 days: {weekly_total}")
        elif choice == '7':
            print("Goodbye!")
            break
        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    # Ensure the database is created before starting the menu
    create_database()
    main_menu()
