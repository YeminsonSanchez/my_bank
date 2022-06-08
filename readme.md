Desafio Mi Banco del Módulo 7

Para comenzar el proyecto se necesita primero:

- Llegar al directorio desde el terminal
- Instalar la dependencia con el comando (npm i)
- Crear Base de datos en postgresql, datos incluidos en el archivo (dbBank.sql)
- agregar tus credeciales de postgreSQL en archivo index.js lineas 7 y 9

Luego para probar que la aplicacion funciona de forma correcta, lo podemos realizar de la siguiente forma, (todos los datos en los parametros son de EJEMPLO):

- "Agregar una nueva transaccion."

  - en el terminal, escribir el siguiente comando:

    node index.js newTransaction descripcion monto cuenta cuenta2
    node index.js newTransaction pago 2500 1 2

- "Consultar los las transacciones de una cuenta especifica."

  - en el terminal, escribir el siguiente comando:

    node index.js allTransaction cuenta
    node index.js allTransaction 2

- "Consultar el saldo de una saldo de una cuenta especifica."
  - en el terminal, escribir el siguiente comando:
    node index.js balance cuenta
    node index.js balance 2

