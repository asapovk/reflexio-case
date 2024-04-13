# Reflexio Demo Project 
This demo project serves as an administration panel for displaying and managing user lists, groups, and invitations. The application consists of a set of routes, where each page and state is characterized by a specific value in the browser's address bar. Importantly, the state and route are linked in such a way that even after page reload, the user lands in the correct state corresponding to the current route displayed in the address bar.

In this project, we showcase how to build a scalable architecture with a clear separation between UI and business logic using the Reflexio library and a set of plugins developed on top of it. Specifically, we demonstrate how plugins like bite-router, bite-stager, and bite-event-manager can address the issue of coupling between various modules of business logic.

# Features
1. Clear Navigation: Seamless navigation between pages with app state synchronized to the URL.
2. Scalable Architecture: Utilizes Reflexio library and its plugins for building a scalable architecture.
3. Plugin Integration: Demonstrates integration of bite-router, bite-stager, and bite-event-manager plugins for effective management of business logic.

# Usage
To run the demo project locally, follow these steps:

Clone the repository: git clone <repository-url>
Navigate to the project directory: cd <project-directory>
Install dependencies: 

```bash
    yarn
```
Start the development server: 

```bash
    yarn start
```

# Contributions
Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

# License
This project is licensed under the MIT License.