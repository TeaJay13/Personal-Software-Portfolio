// Task.cpp
#include "Task.h"
#include <iostream>

// Constructor
Task::Task(const std::string& name, const std::string& description, const std::string& dueDate)
    : name(name), description(description), dueDate(dueDate), completed(false) {}

// Getters
std::string Task::getName() const { return name; }
std::string Task::getDescription() const { return description; }
std::string Task::getDueDate() const { return dueDate; }
bool Task::isCompleted() const { return completed; }

// Setters
void Task::setName(const std::string& name) { this->name = name; }
void Task::setDescription(const std::string& description) { this->description = description; }
void Task::setDueDate(const std::string& dueDate) { this->dueDate = dueDate; }

// Other Methods
void Task::markCompleted() { completed = true; }

void Task::displayTask() const {
    std::cout << name << " (" << (completed ? "Completed" : "Pending") << ") - Due: " << dueDate << std::endl;
    std::cout << "   Description: " << description << std::endl;
}
