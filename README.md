# Proyecto Pokémon - Test Desarrollador Angular

Este es un proyecto Angular que cumple con los requerimientos del Test Desarrollador Angular. El proyecto utiliza la API pública de [PokeAPI](https://pokeapi.co/) para generar una tabla con paginación de Pokémon, filtrar por nombre, guardar en favoritos, mostrar información detallada de un Pokémon seleccionado y proporcionar estadísticas sobre la cantidad de Pokémon que inician con cada letra del abecedario.

## Requerimientos del Test

1. Generar una tabla con paginación para recorrer el listado completo de Pokémon. Conectar al método de obtener un listado de Pokémon desde [https://pokeapi.co/api/v2/pokemon](https://pokeapi.co/api/v2/pokemon).
   - Debe tener la opción de filtrar por algún texto del nombre del Pokémon (por ejemplo, "charizard" o "pikachu").
2. Al seleccionar un Pokémon del listado, en el contenedor de la derecha se debe mostrar su información detallada. Obtener los datos de este método: [https://pokeapi.co/api/v2/pokemon/charizard](https://pokeapi.co/api/v2/pokemon/charizard).

3. En una tabla debajo de la sección detallada previamente, se debe colocar una tabla resumen que indique la cantidad de Pokémon que inician con cada letra del abecedario.

4. Se debe permitir seleccionar un Pokémon como favorito y mostrar su información en la parte superior del sitio. Al hacer clic en el Pokémon favorito en el encabezado, se debe mostrar un diálogo con la información detallada del mismo.

## Tecnologías Utilizadas

- Angular
- RxJS
- Ngrx/Store (Redux)

## Instalación y Ejecución

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Ejecuta `npm start` para iniciar la aplicación en modo desarrollo.

## Demo

[_Clck aqui para ir a la página web alojada en Vercel._](https://pokemon-app-defontana.vercel.app/)

## Contribución

Si deseas contribuir a este proyecto, sigue los pasos a continuación:

1. Haz un _fork_ del repositorio.
2. Crea una nueva rama para tu contribución: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz _commit_ de ellos: `git commit -m 'Agrega nueva funcionalidad'`.
4. Sube tus cambios a tu repositorio: `git push origin feature/nueva-funcionalidad`.
5. Abre un _pull request_ para que tus cambios sean revisados.

## Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).

## Contacto

Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto conmigo.

---

**¡Gracias por revisar mi proyecto!** 😄
