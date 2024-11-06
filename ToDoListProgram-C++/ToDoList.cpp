// ToDoList.cpp
#include "ToDoList.h"
#include <iostream>
#include <limits> // For std::numeric_limits
#include <fstream> // For file operations

void ToDoList::displayMenu() {
    std::cout << "\n---------- To-Do List Menu -----------\n";
    std::cout << "1. Add Task\n";
    std::cout << "2. Delete Task\n";
    std::cout << "3. Display Tasks\n";
    std::cout << "4. Mark Task as Completed\n";
    std::cout << "5. Edit Task\n";
    std::cout << "6. Exit\n";
    std::cout << "-----------------------------------------\n";
}

void ToDoList::addTask() {
    std::string name, description, dueDate;
    std::cout << "Enter task name: ";
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Clear input buffer
    std::getline(std::cin, name);
    std::cout << "Enter task description: ";
    std::getline(std::cin, description);
    std::cout << "Enter task due date (YYYY-MM-DD): ";
    std::getline(std::cin, dueDate);

    tasks.emplace_back(name, description, dueDate);
    std::cout << "Task added successfully!" << std::endl;
}

void ToDoList::deleteTask() {
    if (tasks.empty()) {
        std::cout << "No tasks to delete!" << std::endl;
        return;
    }
    displayTasks();
    std::cout << "Enter the task number to delete: ";
    int taskNumber;
    std::cin >> taskNumber;
    if (taskNumber >= 1 && taskNumber <= static_cast<int>(tasks.size())) {
        tasks.erase(tasks.begin() + taskNumber - 1);
        std::cout << "Task deleted successfully!" << std::endl;
    } else {
        std::cout << "Invalid task number!" << std::endl;
    }
}

void ToDoList::displayTasks() {
    if (tasks.empty()) {
        std::cout << "No tasks to display!" << std::endl;
        return;
    }
    std::cout << "Tasks:" << std::endl;
    for (size_t i = 0; i < tasks.size(); ++i) {
        std::cout << i + 1 << ". ";
        tasks[i].displayTask();
    }
}

void ToDoList::markTaskCompleted() {
    if (tasks.empty()) {
        std::cout << "No tasks to mark as completed!" << std::endl;
        return;
    }
    displayTasks();
    std::cout << "Enter the task number to mark as completed: ";
    int taskNumber;
    std::cin >> taskNumber;
    if (taskNumber >= 1 && taskNumber <= static_cast<int>(tasks.size())) {
        tasks[taskNumber - 1].markCompleted();
        std::cout << "Task marked as completed!" << std::endl;
    } else {
        std::cout << "Invalid task number!" << std::endl;
    }
}

void ToDoList::editTask() {
    if (tasks.empty()) {
        std::cout << "No tasks to edit!" << std::endl;
        return;
    }
    displayTasks();
    std::cout << "Enter the task number to edit: ";
    int taskNumber;
    std::cin >> taskNumber;
    if (taskNumber >= 1 && taskNumber <= static_cast<int>(tasks.size())) {
        Task& task = tasks[taskNumber - 1];
        std::string name, description, dueDate;
        std::cout << "Enter new task name (current: " << task.getName() << "): ";
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Clear input buffer
        std::getline(std::cin, name);
        std::cout << "Enter new task description (current: " << task.getDescription() << "): ";
        std::getline(std::cin, description);
        std::cout << "Enter new task due date (current: " << task.getDueDate() << "): ";
        std::getline(std::cin, dueDate);

        if (!name.empty()) task.setName(name);
        if (!description.empty()) task.setDescription(description);
        if (!dueDate.empty()) task.setDueDate(dueDate);

        std::cout << "Task updated successfully!" << std::endl;
    } else {
        std::cout << "Invalid task number!" << std::endl;
    }
}

void ToDoList::run() {
    const std::string filename = "tasks.txt";
    loadFromFile(filename); // Load tasks at the start

    int choice;
    do {
        displayMenu();
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        switch (choice) {
            case 1: addTask(); break;
            case 2: deleteTask(); break;
            case 3: displayTasks(); break;
            case 4: markTaskCompleted(); break;
            case 5: editTask(); break;
            case 6:
                saveToFile(filename); // Save tasks before exiting
                std::cout << "Exiting program. Bye!" << std::endl;
                break;
            default:
                std::cout << "Invalid choice. Please try again!" << std::endl;
        }
    } while (choice != 6);
}


void ToDoList::saveToFile(const std::string& filename) {
    std::ofstream outFile(filename);
    if (!outFile) {
        std::cout << "Error opening file for writing!" << std::endl;
        return;
    }

    for (const Task& task : tasks) {
        outFile << task.getName() << "\n";
        outFile << task.getDescription() << "\n";
        outFile << task.getDueDate() << "\n";
        outFile << task.isCompleted() << "\n"; // Save as 0 or 1
    }

    outFile.close();
    std::cout << "Tasks saved to file successfully!" << std::endl;
}

//File methods

void ToDoList::loadFromFile(const std::string& filename) {
    std::ifstream inFile(filename);
    if (!inFile) {
        std::cout << "Error opening file for reading!" << std::endl;
        return;
    }

    tasks.clear(); // Clear existing tasks before loading
    std::string name, description, dueDate;
    bool completed;

    while (std::getline(inFile, name)) {
        std::getline(inFile, description);
        std::getline(inFile, dueDate);
        inFile >> completed;
        inFile.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Ignore newline after `completed`

        tasks.emplace_back(name, description, dueDate);
        if (completed) {
            tasks.back().markCompleted();
        }
    }

    inFile.close();
    std::cout << "Tasks loaded from file successfully!" << std::endl;
}
