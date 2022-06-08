CREATE DATABASE banco;

\c banco 

CREATE TABLE cuenta (
  id INT PRIMARY KEY,
  saldo DECIMAL CHECK (saldo >= 0)
);

CREATE TABLE transaccion (
  id SERIAL PRIMARY KEY,
  descripcion varchar(50),
  monto DECIMAL,
  cuenta INT REFERENCES cuenta(id),
  fecha TIMESTAMP
);

INSERT INTO
  cuenta (id, saldo)
VALUES
  (1, 20000),
  (2, 20000),
  (3, 20000),
  (4, 20000),
  (5, 20000);