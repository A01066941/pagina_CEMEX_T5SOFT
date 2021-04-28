USE master;
GO

-- DROP DATABASE CemexDB
-- GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'CemexDB')
BEGIN
  CREATE DATABASE CemexDB;
END;
GO

USE CemexDB;
GO

CREATE TABLE USER_INFO (
    id        INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    username  VARCHAR(15),
    email     VARCHAR(254),
    firstName VARCHAR(50),
    lastName  VARCHAR(50),
    pwHash    VARCHAR(60),
);
GO

CREATE TABLE ADMIN_USER (
    id INT NOT NULL PRIMARY KEY
);
GO

ALTER TABLE ADMIN_USER
ADD CONSTRAINT id_kfor
FOREIGN KEY (id)
REFERENCES USER_INFO(id);
GO


-------------------------------------

-- TEST VALUES

USE CemexDB;
GO

-- DELETE FROM ADMIN_USER
-- DELETE FROM USER_INFO

INSERT INTO USER_INFO VALUES('john.doe', 'john.doe@cemex.mx', 'John', 'Doe', '$2a$10$VQkTCGn3c1BDGBQGgCxeGucQ/DTZqUQpen.tdu2tbZP1JHi4wKVsG') -- password
INSERT INTO USER_INFO VALUES('mary.sue', 'mary.sue@cemex.mx', 'Mary', 'Sue', '$2a$10$fPM5jtJnBijMPRBKO0e3U.BU0mFg3K2ng1yWbF386HoA3ir9eP2N6') -- 12345
INSERT INTO USER_INFO VALUES('test.foo', 'test.foo@cemex.mx', 'Test', 'Foo', '$2a$10$KkhBaY3oIlxmdqPo8FL5le7zTEAAVI5Gdfd1YzXjOD9i1gsG10jO2') -- qwerty
GO

INSERT INTO ADMIN_USER VALUES(1)
INSERT INTO ADMIN_USER VALUES(2)
GO
