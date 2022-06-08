const { newTransaction, allRegister, balance } = require("./consultBank");
const { Pool } = require("pg");
const args = process.argv.slice(2);
const typeFuncion = args[0];

const config = {
  user: "/aqui tu usuario de postgreSQL/",
  host: "localhost",
  password: "/aqui tu password/",
  database: "banco",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

pool.connect(async (error_conection, client, release) => {
  if (error_conection) {
    // si hay error en la conxión

    console.error(error_conection.code, error_conection.message);
  } else if (typeFuncion == "newTransaction") {
    await newTransaction(args[1], args[2], args[3], args[4], client);
  } else if (typeFuncion == "allRegister") {
    await allRegister(args[1], client);
  } else if (typeFuncion == "balance") {
    await balance(args[1], client);
  }
  release();
  pool.end();
});
