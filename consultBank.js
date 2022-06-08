const Cursor = require("pg-cursor");
const { readCursor } = require("./cursorHelper");

//  1. Crear una función asíncrona que registre una nueva transacción utilizando valores
// ingresados como argumentos en la línea de comando. Debe mostrar por consola la
//  última transacción realizada.

const newTransaction = async (description, amount, acount, acount2, client) => {
  const inserTransaction = {
    text: "INSERT INTO transaccion (descripcion, monto, cuenta, fecha) values ($1, $2, $3, NOW()) RETURNING *",
    values: [description, amount, acount],
  };

  const descontar = {
    text: "UPDATE cuenta SET saldo = saldo -$1 WHERE id = $2 RETURNING *",
    values: [amount, acount],
  };

  const acreditar = {
    text: "UPDATE cuenta SET saldo = saldo +$1 WHERE id = $2 RETURNING *",
    values: [amount, acount2],
  };
  try {
    await client.query("BEGIN");

    await client.query(descontar);
    await client.query(acreditar);
    const insertTranssaction = await client.query(inserTransaction);
    console.log(
      "transaccion realizada con exito: ",
      insertTranssaction.rows[0]
    );
    await client.query("COMMIT");
  } catch (error_consult) {
    // retorna el error de la consulta por consola
    await client.query("ROLLBACK");
    return console.log(error_consult.code, error_consult.message);
  }
};

// 2. Realizar una función asíncrona que consulte la tabla de transacciones y retorne
// máximo 10 registros de una cuenta en específico. Debes usar cursores para esto.

const allRegister = async (acount, client) => {
  const SQLquery = `SELECT id, descripcion, monto, cuenta, fecha FROM transaccion WHERE cuenta = ${acount} `;
  try {
    const consulta = new Cursor(SQLquery);
    const cursor = await client.query(consulta);
    const rows = await readCursor(cursor, 10, true);
    console.log(`la cuenta: ${acount}`, rows);
  } catch (erro_consult) {
    return console.log(erro_consult.code, erro_consult.message);
  }
};

// 3. Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
// ejecutada con valores ingresados como argumentos en la línea de comando. Debes
// usar cursores para esto.

const balance = async (id, client) => {
  const SQLquery = `SELECT saldo FROM cuenta WHERE id = ${id} `;
  try {
    const consulta = new Cursor(SQLquery);
    const cursor = await client.query(consulta);
    const rows = await readCursor(cursor, 10, true);
    console.log(`El saldo de la cuenta ${id}: `, rows);
  } catch (erro_consult) {
    // 4. En caso de haber un error en la transacción, se debe retornar el error por consola.
    return console.log(erro_consult.code, erro_consult.message);
  }
};

module.exports = { newTransaction, allRegister, balance };
