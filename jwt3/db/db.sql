CREATE DATABASE token;
DROP DATABASE token;
\c token

CREATE TABLE IF NOT EXISTS client(
    id_client SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL
); 
DROP TABLE client;

CREATE TABLE IF NOT EXISTS client_data(
    id_client_data SERIAL PRIMARY KEY,
    datauser VARCHAR(100) NOT NULL,
    id_strange INT,
    FOREIGN KEY(id_strange) REFERENCES client(id_client)
); 
DROP TABLE client_data;


CREATE VIEW client_user AS 
SELECT c.id_client, c.username, c.email, c.pass, d.datauser
FROM  client c 
INNER JOIN client_data d
ON id_client = id_strange;  

DROP VIEW client_user;

SELECT * FROM client_user;

DELETE * FROM   client;    
DELETE * FROM   client_data;   

INSERT INTO client_data VALUES(2,'node review to test job',2);
INSERT INTO client_data VALUES(3,'logistics programing software',2);
INSERT INTO client_data VALUES(4,'node review to test job again',3);