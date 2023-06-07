<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h3 align="center">Task tracker app</h3>

  <p align="center">
    This is a coding challenge for my job application
  </p>
</div>


### Built With

* Vue.js
* node.js
* MySQL

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
Setup the pre-requisites before trying out the app

### Prerequisites
#### MySQL
1. Download any MySQL client. For this one, I used XAMPP.
    > [Download and setup XAMPP here](https://www.apachefriends.org/download.html);
2. I've also used HeidiSQL to help me manage the database better.
    > [Download HeidiSQL here](https://www.apachefriends.org/download.html)
3. Run this sql script to create database and tables
    <details>
      <summary>task_tracker.sql</summary>

        ```
        -- --------------------------------------------------------
        -- Host:                         127.0.0.1
        -- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
        -- Server OS:                    Win64
        -- HeidiSQL Version:             12.5.0.6677
        -- --------------------------------------------------------

        /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
        /*!40101 SET NAMES utf8 */;
        /*!50503 SET NAMES utf8mb4 */;
        /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
        /*!40103 SET TIME_ZONE='+00:00' */;
        /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
        /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
        /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


        -- Dumping database structure for time_tracker
        CREATE DATABASE IF NOT EXISTS `time_tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
        USE `time_tracker`;

        -- Dumping structure for table time_tracker.t_member
        CREATE TABLE IF NOT EXISTS `t_member` (
          `member_id` int(10) NOT NULL AUTO_INCREMENT,
          `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
          `first_name` varchar(255) NOT NULL,
          `last_name` varchar(255) NOT NULL,
          `username` varchar(255) NOT NULL,
          `password` varchar(255) NOT NULL DEFAULT 'NULL',
          PRIMARY KEY (`member_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

        -- Dumping data for table time_tracker.t_member: ~0 rows (approximately)

        -- Dumping structure for table time_tracker.t_project
        CREATE TABLE IF NOT EXISTS `t_project` (
          `project_id` int(10) NOT NULL AUTO_INCREMENT,
          `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
          `project_name` varchar(255) NOT NULL,
          `color` enum('blue','orange','red','green') NOT NULL,
          PRIMARY KEY (`project_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

        -- Dumping data for table time_tracker.t_project: ~4 rows (approximately)
        INSERT INTO `t_project` (`project_id`, `created_at`, `project_name`, `color`) VALUES
          (1, '2023-06-07 03:38:01', 'Turbo Guacamole', 'orange'),
          (2, '2023-06-07 03:38:13', 'Redesigned Happiness', 'blue'),
          (3, '2023-06-07 03:38:31', 'Glowing Palm Tree', 'green'),
          (4, '2023-06-07 03:39:36', 'Bookish Waddle', 'red');

        -- Dumping structure for table time_tracker.t_task
        CREATE TABLE IF NOT EXISTS `t_task` (
          `task_id` int(10) NOT NULL AUTO_INCREMENT,
          `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
          `member_id` int(11) NOT NULL,
          `project_id` int(11) NOT NULL,
          `log_datetime` datetime NOT NULL,
          `task_name` varchar(255) NOT NULL,
          `task_description` varchar(500) NOT NULL DEFAULT 'NULL',
          `hours` varchar(255) NOT NULL DEFAULT 'NULL',
          PRIMARY KEY (`task_id`),
          KEY `FK_t_task_t_member` (`member_id`),
          KEY `FK_t_task_t_project` (`project_id`),
          CONSTRAINT `FK_t_task_t_member` FOREIGN KEY (`member_id`) REFERENCES `t_member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT `FK_t_task_t_project` FOREIGN KEY (`project_id`) REFERENCES `t_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

        -- Dumping data for table time_tracker.t_task: ~0 rows (approximately)

        /*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
        /*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
        /*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
        /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
        /*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

        ```
    </details>
  
 
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/fuhlicity/task-tracker-app.git
   ```
2. Go to `task-tracker-app/task-tracker`
   ```sh
   cd task-tracker-app/task-tracker
   ```
3. Install node packages including vite. This app was developed using vite as a local server.
   ```node
   npm install
   ```
4. Start vite server
   ```node
   npm run dev
   ```
5. Start node server
   ```node
   npm start
   ```
6. Visit `http://127.0.0.1:5173` and start exploring the app

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

LinkedIn: [LinkedIn](https://www.linkedin.com/in/angelika-macapagal/)

Project Link: [https://github.com/fuhlicity/task-tracker-app](https://github.com/fuhlicity/task-tracker-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

