module.exports = {
    HOST: "localhost",
    USER: "cooperveysey",
    PASSWORD: undefined,
    DB: "helpful_human_interview_challenge_database",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};