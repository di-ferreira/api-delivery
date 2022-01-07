export default {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "test",
    "password": "test",
    "database": "test",
    "entities": ["./src/models/*.ts"],
    "migrations": ["./src/database/migrations/*.ts"],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    },
    "synchronize": false
}