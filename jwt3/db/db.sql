CREATE DATABASE token;
DROP DATABASE token;
\c token

CREATE TABLE IF NOT EXISTS client(
    id_client SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(10) NOT NULL
); 
DROP TABLE client;

CREATE TABLE IF NOT EXISTS client_data(
    id_client_data SERIAL PRIMARY KEY,
    datauser VARCHAR(100) NOT NULL,
    id_strange INT,
    FOREIGN KEY(id_strange) REFERENCES client(id_client)
); 
DROP TABLE client_data;


CREATE VIEW clientuser AS 
SELECT c.id_client, c.username, c.email,  d.datauser
FROM  client c 
INNER JOIN client_data d
ON id_client = id_strange;   

SELECT * FROM clientuser;
