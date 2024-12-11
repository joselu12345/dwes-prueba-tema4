DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    perfil VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE medicos ADD COLUMN imagen VARCHAR(200) AFTER especialidad;

INSERT INTO medicos (nombre, especialidad, perfil) 
VALUES 
  ('Pablo', 'atención primaria', 'residente'),
  ('Ana', 'traumatólogo', 'especialista'),
  ('Eva', 'dermatólogo', 'residente');

CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE alumnos ADD COLUMN imagen VARCHAR(200) AFTER localidad;

INSERT INTO pacientes (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('Alberto', 'Montilla', '2000-01-01'),
  ('Eva', 'La Rambla', '2000-02-02'),
  ('Silvia', 'Lucena', '2000-03-03');