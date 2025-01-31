# Instalación de npm

## Instalación en Windows
1. Descarga el instalador de Node.js desde [https://nodejs.org](https://nodejs.org).
2. Ejecuta el instalador y sigue las instrucciones (elige la versión LTS recomendada).
3. Una vez instalado, abre una terminal (CMD o PowerShell) y verifica la instalación ejecutando:
   ```sh
   node -v
   npm -v
   ```


### Opción 2: Usando Homebrew
1. Abre una terminal y ejecuta:
   ```sh
   brew install node
   ```
2. Verifica la instalación con:
   ```sh
   node -v
   npm -v
   ```


## Verificación de instalación
Para asegurarte de que `npm` está correctamente instalado, ejecuta:
```sh
npm -v
```
Si muestra un número de versión, la instalación fue exitosa.


# Instalación de dependencias

## En /Client

```sh
cd /Client
npm i
```

## En /Server

```sh
cd /Server
npm i
```

# Configurar .env 

## En /Client

Inicia Sesion en stripe y pega en el .env la clave publica

VITE_STRIPE_PUBLIC_KEY= *tu clave*

## En /Server

PORT=4000

URLFRONT= *url del front*

DB_USER=*tu usuario*

DB_PASSWORD=*tu contraseña*


TOKEN_KEY=*tu palabra secreta*

EMAIL_HOST=*host del email admin*

EMAIL_PORT=*puerto del email admin*

EMAIL_USER=*email del admin*

EMAIL_PASS= *pegar la que te da el email*

Inicia Sesion en stripe y pega en el .env la clave secreta

STRIPE_SECRET_KEY= *tu clave*


# Instalar tu servidor SQL

Recomendacion MySQLWorkbench
[Click aqui para descargar](https://dev.mysql.com/downloads/workbench/)

# Ejecutar proyecto :)

## En /Client

```sh
cd /Client
npm run dev
```

## En /Server

```sh
cd /Server
npm run dev
```

 
