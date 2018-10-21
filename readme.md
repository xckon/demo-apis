# Curso APIs


## Charla
(slides)


## Demos / Ejemplos

### Requirements
* Node 8.9.x

### Set-Up

El proyecto se encuentra configurado como un mono-repo, para poder inicializar los proyectos de forma correcta es necesario instalar Lerna:

```bash
npm install -g lerna
```

Luego de instalar lerna y checkouteado el proyecto, en la raiz del mismo se debe correr el siguiente comando para descargar y linkear las dependencias de manera correcta.

```bash
lerna bootstrap
```

### Run Demos
Las demos se encuentas encuentran estructuradas ubicadas dentro de la carpeta *packages*:

> ~/packages
> > **demo-1--get**:
> > 
> > [GET] http://localhost:8000/
> > 
> > **demo-2--post**:
> > 
> > **demo-3--put**:
> > 
> > **demo-4--patch**:
> > 
> > **demo-5--delete**:
> > 
> > **demo-6--query**:
> > 
> > **demo-7--paging**:
> > 
> > **demo-8--hateoas**:
> > 

Tener en cuenta que cada demo es incremental, esto quiere decir que dentro de la `demo-8--hateoas`, por ejemplo, se encuentan todos los endpoints definidos durante las demos anteriores.

Para correr las demos se debe ejecutar el siguiente comando en el root del proyecto

```bash
npm run demo:<number>

# example: npm run demo:1
# example: npm run demo:2
# ...
# example: npm run demo:8
```

Este comando va a correr el server y va a imprimir el puerto correspondiente donde va se va a encontrar corriendo, el puerto default es el `8000`