// ToDoList.h
#pragma once
#include <vector>
#include <string>
#include "Task.h"

class ToDoList {
private:
    std::vector<Task> tasks;

public:
    void displayMenu();
    void addTask();
    void deleteTask();
    void displayTasks();
    void markTaskCompleted();
    void editTask();
    void run();

    // Declarations for file I/O methods
    void saveToFile(const std::string& filename);
    void loadFromFile(const std::string& filename);
};
