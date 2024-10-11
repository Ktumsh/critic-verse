import { customAlphabet } from 'nanoid';
import { Game } from '../types/game';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const GAME_MODEL: Game[] = [
  {
    id: 'black-myth:-wukong',
    title: 'Black Myth: Wukong',
    image: '/assets/game/01.png',
    description:
      'Black Myth: Wukong es un juego de rol de acción basado en la mitología china. La historia está basada en Viaje al Oeste, una de las cuatro grandes novelas clásicas de la literatura china. Te embarcarás en el papel del Destinado para aventurarte en los desafíos y maravillas que te esperan, para descubrir la verdad oculta tras el velo de una gloriosa leyenda del pasado',
    rating: 9,
    detail: {
      summary: 'Black Myth: Wukong',
      genre: ['Acción', 'Aventura'],
      platforms: ['PS5', 'Xbox One', 'PC'],
      releaseDate: new Date('2024-08-19'),
      editor: 'Game Science',
      developer: 'Game Science',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment: 'Muy buen juego, me gustó mucho. Le doy 10 de 10',
        date: new Date('2024-08-23'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Gran jugabilidad y gráficos impresionantes, pero la historia podría ser más profunda.',
        date: new Date('2024-08-30'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment: 'Excelente juego, aunque tiene algunos bugs menores.',
        date: new Date('2024-09-01'),
        userId: '3',
        report: {
          reason: 'Comentario repetitivo y no constructivo.',
          date: new Date('2024-09-02'),
          reportedBy: '4',
        },
      },
    ],
  },
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    image: '/assets/game/02.png',
    description:
      'Las Tierras Intermedias, empañadas por la guerra, sólo pueden sentir la gracia de la Gran Voluntad una vez más cuando un nuevo Señor de los Elden blande el Anillo de los Elden. Levántate, Tarnished, y sigue el camino más allá del mar de niebla para encontrar tu destino en la nueva experiencia similar a Dark Souls de FromSoftware Inc. Escrito por Hidetaka Miyazaki, el creador de Dark Souls, y George R.R. Martin, la mente maestra detrás de Canción de Hielo y Fuego, el juego promete un viaje cautivador pero brutal, en el que la valentía, la determinación y la insaciable sed de triunfo son la clave para acabar recogiendo todos los fragmentos del Elden Ring.',
    rating: 8,
    detail: {
      summary: 'Elden Ring',
      genre: ['Acción', 'RPG'],
      platforms: ['PS4', 'Xbox One', 'PC', 'PS5'],
      releaseDate: new Date('2022-02-25'),
      editor: 'Bandai Namco Games',
      developer: 'From Software',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Los años de espera valieron la pena, Elden Ring es genial. Ofrece una gran cantidad de contenido, un mundo hermoso y una jugabilidad adictiva. Pero la serie comienza a sentirse un poco obsoleta.',
        date: new Date('2023-03-10'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La dificultad es alta, pero eso es parte de su encanto. Sin embargo, no es para todos.',
        date: new Date('2023-04-15'),
        userId: '4',
        report: {
          reason: 'Comentario negativo sin justificación.',
          date: new Date('2023-04-16'),
          reportedBy: '5',
        },
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Gran juego, pero a veces se siente repetitivo en comparación con Dark Souls.',
        date: new Date('2023-05-20'),
        userId: '5',
      },
    ],
  },
  {
    id: 'the-legend-of-zelda:-tears-of-the-kingdom',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    image: '/assets/game/03.png',
    description:
      'Te espera una aventura épica por las tierras y los cielos de Hyrule en The Legend of Zelda™: Tears of the Kingdom para Nintendo Switch™. La aventura es tuya para crearla en un mundo alimentado por tu imaginación. En esta secuela de The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las misteriosas islas que flotan en los vastos cielos.',
    rating: 3,
    detail: {
      summary: 'The Legend of Zelda: Tears of the Kingdom',
      genre: ['Acción', 'RPG'],
      platforms: ['Nintendo Switch'],
      releaseDate: new Date('2023-05-12'),
      editor: 'Nintendo',
      developer: 'Nintendo',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 2,
        comment:
          'En general, es entretenido, pero eso es todo, es simplemente entretenido. Hay mucho que hacer, pero las cosas que realmente estás haciendo se sienten un poco superficiales. Noto que mi cerebro se desconecta mientras juego, de la misma manera que lo hace cuando veo cosas como TikTok.',
        date: new Date('2024-01-15'),
        userId: '3',
        report: {
          reason: 'Comentario considerado inapropiado.',
          date: new Date('2024-01-16'),
          reportedBy: '6',
        },
      },
      {
        id: nanoid(),
        rating: 3,
        comment:
          'Esperaba más innovación. El juego es bonito, pero carece de profundidad.',
        date: new Date('2024-02-12'),
        userId: '6',
      },
    ],
  },
  {
    id: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    image: '/assets/game/04.png',
    description:
      'Desarrollado por los creadores de Grand Theft Auto V y Red Dead Redemption, Red Dead Redemption 2 es una historia épica sobre la vida en el implacable corazón de Estados Unidos. El vasto y atmosférico mundo del juego también proporciona la base para una nueva experiencia multijugador en línea. Estados Unidos, 1899. Ha comenzado el fin de la era del Salvaje Oeste.',
    rating: 9,
    detail: {
      summary: 'Red Dead Redemption 2',
      genre: ['Acción', 'RPG'],
      platforms: ['Xbox One', 'PC', 'PS5', 'PS4'],
      releaseDate: new Date('2016-05-23'),
      editor: 'Blizzard Entertainment',
      developer: 'Blizzard Entertainment',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Nunca hubo dudas de que Red Dead Redemption 2 iba a ser bueno, pero este es algo especial. Una obra maestra de la que muchos hablarán durante décadas.',
        date: new Date('2020-01-11'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La historia es increíble, pero algunas misiones pueden ser largas y aburridas.',
        date: new Date('2021-02-15'),
        userId: '7',
        report: {
          reason: 'Comentario negativo sin justificación.',
          date: new Date('2021-02-16'),
          reportedBy: '8',
        },
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Mundo abierto detallado y vibrante. Me encantó explorar cada rincón.',
        date: new Date('2022-03-22'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Aunque es un gran juego, los controles pueden ser algo torpes a veces.',
        date: new Date('2023-04-10'),
        userId: '9',
      },
    ],
  },
  {
    id: 'sons-of-the-forest',
    title: 'Sons of the Forest',
    image: '/assets/game/05.png',
    description:
      'Una experiencia completamente nueva de los creadores de "The Forest". Te envían a buscar a un multimillonario desaparecido en una isla remota y te encuentras en un infierno infestado de caníbales. Crea, construye y lucha por sobrevivir, solo o con amigos, en este nuevo y aterrador simulador de terror de supervivencia en mundo abierto. Experimenta la libertad total para enfrentarte al mundo como quieras.',
    rating: 6,
    detail: {
      summary: 'Sons of the Forest',
      genre: ['Acción', 'Survival'],
      platforms: ['PC'],
      releaseDate: new Date('2024-02-22'),
      editor: 'Newnight',
      developer: 'Endnight Studios',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Sons of the Forest puede tener algunos problemas con su narrativa, pero sus fundamentos de supervivencia y su sandbox aún merecen una mirada.',
        date: new Date('2024-05-28'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'El juego tiene potencial, pero la falta de contenido y los bugs arruinan la experiencia.',
        date: new Date('2024-06-10'),
        userId: '6',
        report: {
          reason: 'Crítica negativa sin detalles suficientes.',
          date: new Date('2024-06-11'),
          reportedBy: '7',
        },
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Gran atmósfera y jugabilidad, pero necesita más optimización y contenido para mantener a los jugadores interesados.',
        date: new Date('2024-07-01'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 4,
        comment:
          'Esperaba más, pero parece más una versión beta que un lanzamiento completo.',
        date: new Date('2024-07-15'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'El concepto es bueno, pero la ejecución deja mucho que desear. A la espera de futuras actualizaciones.',
        date: new Date('2024-08-05'),
        userId: '9',
      },
    ],
  },
  {
    id: 'ea-fc-25',
    title: 'EA SPORTS FC 25',
    image: '/assets/game/06.png',
    description:
      'EA SPORTS FC 25 te ofrece más formas de ganar para el club. Forma equipo con tus amigos en tus modos favoritos con el nuevo 5v5 Rush y dirige a tu club hacia la victoria mientras FC IQ ofrece más control táctico que nunca.',
    rating: 9,
    detail: {
      summary: 'EA SPORTS FC 25',
      genre: ['Soccer sim'],
      platforms: ['PC', 'PS5', 'PS4', 'Xbox Series X/S'],
      releaseDate: new Date('2024-09-27'),
      editor: 'Electronic Arts',
      developer: 'EA Canada',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Para ser sincero, no esperaba muchos cambios, pero disfruté mucho de FC24 y los cambios que hicieron para la versión 25 son todos para mejor. El modo Carrera ahora es realmente divertido y la jugabilidad realmente se siente diferente',
        date: new Date('2024-09-28'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El trazado de rayos cambia cosas, pero arregla el reflejo de los trofeos. ¿Ha sido un mapa cúbico básico como el de FIFA 15?',
        date: new Date('2024-09-28'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'EA Sports FC 25 ha sido el juego que ha recibido el desarrollo más serio entre los juegos de fútbol lanzados en los últimos años',
        date: new Date('2024-09-29'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Gracias a un par de mejoras y cambios clave, EA Spots FC 25 es una de las mejores iteraciones que la franquicia de fútbol anual de EA Sports ha visto en los últimos años.',
        date: new Date('2024-09-29'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 1,
        comment:
          'Una palabra injugable, necesitan hacer un estudio sobre cómo este juego sigue empeorando año tras año.',
        date: new Date('2024-09-28'),
        userId: '9',
      },
    ],
  },
  {
    id: 'grand-theft-auto-V',
    title: 'Grand Theft Auto V',
    image: '/assets/game/07.png',
    description:
      'Los Santos es una vasta metrópolis bañada por el sol llena de gurús de la autoayuda, estrellas y personajes importantes que antes eran conocidos como celebridades. La ciudad fue en su día la envidia del mundo occidental, pero ahora lucha por mantenerse a flote en una era de incertidumbre económica y reality shows. En medio del caos, tres criminales singulares planean sus propias posibilidades de supervivencia y éxito: Franklin, un ex gánster callejero en busca de oportunidades reales y dinero; Michael, un ex convicto profesional cuyo retiro es mucho menos prometedor de lo que esperaba; y Trevor, un maníaco violento impulsado por la posibilidad de un subidón barato y el próximo gran golpe. Al quedarse rápidamente sin opciones, la tripulación lo arriesga todo en una secuencia de atracos atrevidos y peligrosos que podrían dejarlos condenados de por vida.',
    rating: 10,
    detail: {
      summary: 'Grand Theft Auto V',
      genre: ['Accion'],
      platforms: ['PC', 'PS3', 'PS4', 'PS5', 'Xbox Series X/S'],
      releaseDate: new Date('2014-11-18'),
      editor: 'Rockstar Games',
      developer: 'Rockstar North',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'El mejor juego de PS3 es ahora lo mejor de PS4. Una remasterización completa y llena de amor de tal calidad que es casi tan esencial como el oxígeno. Pero es... Ayer.',
        date: new Date('2015-01-13'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Por primera vez, puedes jugar con tres personajes y disfruté mucho jugando con cada uno de ellos. El mapa es enorme y detallado y nunca te quedarás sin cosas que hacer en el juego. La historia te atrapa desde el principio y el resultado es increíble.',
        date: new Date('2024-01-15'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Una vista en primera persona, 1080p, un nuevo sistema de clima e iluminación y un montón de contenido adicional se sumarán a una de las experiencias de juego más completas de los últimos años.',
        date: new Date('2014-11-24'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Grand Theft Auto V para PlayStation 4 y Xbox One sigue siendo un juego mejor que la mayoría de los otros juegos lanzados para las nuevas consolas hasta el momento',
        date: new Date('2014-11-17'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'GTA V en PS4 y Xbox One no solo establece un nuevo punto de referencia para los remakes en HD, sino que también supone un desafío para los juegos creados originalmente para esta nueva generación.',
        date: new Date('2018-09-28'),
        userId: '9',
      },
    ],
  },
  {
    id: 'overwatch',
    title: 'Overwatch',
    image: '/assets/game/08.jpg',
    description:
      'Overwatch es un shooter por equipos muy estilizado que se desarrolla en la Tierra en un futuro cercano. Cada partida es un intenso enfrentamiento multijugador en el que un elenco diverso de soldados, mercenarios, científicos, aventureros y rarezas se enfrentan entre sí en un conflicto épico que abarca todo el planeta.',
    rating: 6,
    detail: {
      summary: 'Overwatch',
      genre: ['FPS'],
      platforms: ['PC', 'PS4', 'Xbox One'],
      releaseDate: new Date('2016-05-23'),
      editor: 'Blizzard Entertainment',
      developer: 'Blizzard Entertainment',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Sí, la cantidad de contenido no es enorme ahora, pero sabiendo que hay mucho más por llegar, no hay demasiados fallos en Overwatch. Divertido, profundo, bien diseñado y lleno de posibilidades, es uno de esos juegos que tienes que, al menos, probar.',
        date: new Date('2016-05-26'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Buen shooter, pero demasiado confuso para mí en términos visuales. Overwatch es un FPS online con un estilo artístico único. Es rápido, intenso y recuerda un poco a Team Fortress 2. En Overwatch, puedes elegir un billón de héroes o personajes...',
        date: new Date('2024-01-22'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La calidad prima sobre la cantidad. Puede que Overwatch no tenga mucho contenido, pero aparte de eso, es un shooter en línea equilibrado, variado y con un diseño hermoso, con una selección de héroes notablemente diversa.',
        date: new Date('2016-05-27'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 4,
        comment:
          'No lo considero un verdadero FPS al nivel de Unreal Tournament y Quake, pero puedo decir que al menos, en su mediocre calidad, logró entretenerme y joderme cuando me aburría. No digo que sea un juego que lo merezca, pero ciertamente prefiero a la competencia.',
        date: new Date('2023-08-13'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Dios mío, el juego fue bueno, especialmente los mapas nevados y los eventos arcade, buenos momentos #SaveSoil',
        date: new Date('2024-02-26'),
        userId: '9',
      },
    ],
  },
  {
    id: 'terraria',
    title: 'Terraria',
    image: '/assets/game/09.png',
    description:
      'Terraria ofrece a los jugadores la oportunidad de ser un jugador de acción, un maestro constructor, un coleccionista e incluso un explorador.',
    rating: 8,
    detail: {
      summary: 'Terraria',
      genre: ['Aventura', 'Sandbox'],
      platforms: ['PC', 'PS4', 'Xbox One'],
      releaseDate: new Date('2013-03-27'),
      editor: '505 Games',
      developer: 'Engine Software',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Inmensamente divertido. Casi infinitamente divertido, de hecho. Si aún no lo has jugado, te estás perdiendo un juego de supervivencia y creación en 2D muy inteligente que lleva su influencia retro en la manga. Si ya has pasado cientos de horas cavando, sabrás de lo que hablo.',
        date: new Date('2013-04-02'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Increíble. El mejor juego en 2D que he jugado. Los mods son fáciles de descargar. El juego es fácil de entender (en su mayor parte). Pero la idea está muy bien desarrollada. Este juego es lo máximo.',
        date: new Date('2024-08-29'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Puede que Terraria no sea accesible, pero este mundo abierto es tan profundo que podrías encontrarte inmerso en objetivos autoimpuestos y persiguiendo esa zanahoria de equipo mejorable hasta altas horas de la madrugada. El combate y los eventos mantienen el interés durante más tiempo del que debería ser saludable.',
        date: new Date('2013-04-18'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Me pareció bueno. Me pareció divertido jugarlo. Los controles son un poco torpes, pero me acostumbré. No he jugado la versión para PC, pero puedo asegurar que es mejor.',
        date: new Date('2023-12-03'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 7,
        comment: 'Entretendido.',
        date: new Date('2023-09-20'),
        userId: '9',
      },
    ],
  },
  {
    id: 'fortnite',
    title: 'Fortnite',
    image: '/assets/game/10.png',
    description:
      'Fortnite es un videojuego de estilo Battle Royale desarrollado por Epic Games. Con un enfoque en la construcción de estructuras y una jugabilidad dinámica, el título ha ganado una popularidad masiva desde su lanzamiento. El juego permite a los jugadores formar equipos y competir en un enorme mapa con el objetivo de ser el último en pie.',
    rating: 8,
    detail: {
      summary: 'Fortnite',
      genre: ['Acción', 'Battle Royale'],
      platforms: [
        'PC',
        'PS4',
        'PS5',
        'Xbox One',
        'Nintendo Switch',
        'Android',
        'iOS',
      ],
      releaseDate: new Date('2017-07-25'),
      editor: 'Epic Games',
      developer: 'Epic Games',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Fortnite es un juego que redefine el género Battle Royale. La capacidad de construir y la variedad de armas lo hacen destacar frente a otros títulos similares.',
        date: new Date('2017-10-14'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El juego es entretenido, pero la curva de aprendizaje puede ser un poco elevada para nuevos jugadores. Aún así, la experiencia es gratificante.',
        date: new Date('2018-05-21'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Una experiencia de juego fluida y constante. Las actualizaciones frecuentes mantienen el contenido fresco, pero a veces desequilibran la jugabilidad.',
        date: new Date('2019-02-15'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'Fortnite solía ser mi juego favorito, pero siento que las últimas actualizaciones no le han hecho justicia. Demasiado enfoque en colaboraciones y poco en la jugabilidad original.',
        date: new Date('2020-08-10'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 3,
        comment:
          'Me gusta el concepto, pero odio la comunidad y el enfoque excesivo en skins y cosméticos. Deberían mejorar la experiencia de juego en lugar de centrarse en microtransacciones.',
        date: new Date('2021-03-22'),
        userId: '9',
      },
    ],
  },
  {
    id: 'among-us',
    title: 'Among Us',
    image: '/assets/game/11.png',
    description:
      'Among Us es un juego de deducción social multijugador desarrollado por Innersloth. Los jugadores asumen roles de Tripulantes y deben completar tareas en una nave espacial. Sin embargo, entre ellos se encuentran Impostores cuyo objetivo es sabotear la misión y eliminar a los Tripulantes sin ser descubiertos. La tensión y el engaño hacen de este juego una experiencia llena de estrategia y diversión.',
    rating: 8,
    detail: {
      summary: 'Among Us',
      genre: ['Deducción Social', 'Multijugador'],
      platforms: ['PC', 'iOS', 'Android'],
      releaseDate: new Date('2018-06-15'),
      editor: 'Innersloth',
      developer: 'Innersloth',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Among Us ofrece una experiencia multijugador única. Jugar con amigos y tratar de deducir quién es el impostor genera momentos inolvidables.',
        date: new Date('2020-09-23'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El juego es entretenido, pero la falta de mapas adicionales y tareas más complejas le restan puntos. Aun así, es divertido en sesiones cortas.',
        date: new Date('2020-11-18'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          '¡Me encanta la tensión que genera! Nunca sabes en quién confiar y es genial ver cómo amigos se traicionan por ganar. Ojalá actualicen con más roles y tareas.',
        date: new Date('2021-01-05'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'El juego es bueno, pero se siente repetitivo tras jugar varias partidas seguidas. La comunidad en línea también puede ser tóxica.',
        date: new Date('2021-06-12'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Entretenido, especialmente con amigos. Las sesiones son rápidas y siempre hay momentos de risas. Recomiendo probarlo en reuniones virtuales.',
        date: new Date('2022-03-29'),
        userId: '5',
      },
    ],
  },
  {
    id: 'valorant',
    title: 'Valorant',
    image: '/assets/game/12.png',
    description:
      'Valorant es un shooter táctico en primera persona desarrollado por Riot Games. El juego combina la precisión y jugabilidad estratégica de un FPS con habilidades únicas de personajes (agentes) que cambian la dinámica del combate. Cada partida es un enfrentamiento 5v5 donde los equipos compiten en rondas para plantar o desactivar la Spike (bomba) en diferentes mapas. Con gráficos estilizados y partidas rápidas, Valorant ha captado la atención de jugadores competitivos y de esports en todo el mundo.',
    rating: 8,
    detail: {
      summary: 'Valorant',
      genre: ['Shooter', 'FPS', 'Competitivo'],
      platforms: ['PC'],
      releaseDate: new Date('2020-06-02'),
      editor: 'Riot Games',
      developer: 'Riot Games',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Valorant ofrece una experiencia intensa y estratégica. Las habilidades de cada agente aportan diversidad a las partidas, pero el enfoque en la puntería y el trabajo en equipo son esenciales para ganar.',
        date: new Date('2020-07-15'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Un FPS fresco y adictivo. El juego tiene un gran potencial para los esports y ya está captando una comunidad competitiva sólida. Las actualizaciones constantes ayudan a balancear a los agentes y mantener la experiencia equilibrada.',
        date: new Date('2021-03-22'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El juego está bien optimizado, pero a veces se siente que los agentes no están del todo balanceados. Aun así, la experiencia es bastante satisfactoria para los amantes de los FPS.',
        date: new Date('2021-08-10'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Me gusta la idea y la ejecución, pero encuentro que la curva de aprendizaje es un poco alta para nuevos jugadores. Definitivamente no es un juego casual.',
        date: new Date('2022-01-05'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La jugabilidad es fluida y dinámica. Sin embargo, creo que Riot debería enfocarse en mejorar el sistema de emparejamiento para una experiencia más justa.',
        date: new Date('2022-09-18'),
        userId: '5',
      },
    ],
  },
  {
    id: 'league-of-legends',
    title: 'League of Legends',
    image: '/assets/game/13.png',
    description:
      'League of Legends es un juego de estrategia multijugador en línea (MOBA) desarrollado por Riot Games. Dos equipos de cinco campeones cada uno se enfrentan en la Grieta del Invocador con el objetivo de destruir el nexo enemigo. Cada campeón tiene habilidades únicas y diferentes roles, lo que permite una gran variedad de estilos de juego. Desde su lanzamiento en 2009, LoL se ha convertido en uno de los juegos más populares del mundo y en un pilar del ecosistema de esports.',
    rating: 8,
    detail: {
      summary: 'League of Legends',
      genre: ['MOBA', 'Estrategia', 'Competitivo'],
      platforms: ['PC'],
      releaseDate: new Date('2009-10-27'),
      editor: 'Riot Games',
      developer: 'Riot Games',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'League of Legends ha establecido un estándar para los MOBAs. La profundidad estratégica y la diversidad de campeones hacen que cada partida sea única. Ideal para los amantes de la competencia.',
        date: new Date('2010-12-15'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El juego tiene una curva de aprendizaje alta, pero la comunidad puede ser poco amigable con los novatos. Aun así, una vez que te adentras en el juego, es muy gratificante.',
        date: new Date('2013-05-10'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Es uno de mis juegos favoritos, pero los cambios constantes en los parches a veces hacen difícil seguirle el ritmo. Riot debería considerar un enfoque más estable.',
        date: new Date('2017-11-07'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'El juego está bien, pero la toxicidad en las partidas clasificatorias hace que sea difícil disfrutarlo plenamente. Recomiendo jugar con amigos para evitar malas experiencias.',
        date: new Date('2019-06-25'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un clásico del género MOBA. Siempre regreso a él por su jugabilidad y la constante innovación en campeones y mecánicas. Perfecto para sesiones competitivas con amigos.',
        date: new Date('2020-02-14'),
        userId: '5',
      },
    ],
  },
  {
    id: 'hades',
    title: 'Hades',
    image: '/assets/game/14.png',
    description:
      'Hades es un juego de acción y rogue-like desarrollado por Supergiant Games. El jugador controla a Zagreus, el hijo del dios Hades, mientras intenta escapar del Inframundo y llegar al Monte Olimpo. A lo largo del camino, el jugador se encuentra con diferentes dioses y personajes de la mitología griega que le otorgan poderes y habilidades únicas. El combate es dinámico y desafiante, y cada intento de escape es diferente debido a la estructura procedural de los niveles.',
    rating: 9,
    detail: {
      summary: 'Hades',
      genre: ['Acción', 'Rogue-like'],
      platforms: [
        'PC',
        'Nintendo Switch',
        'PS4',
        'PS5',
        'Xbox One',
        'Xbox Series X/S',
      ],
      releaseDate: new Date('2020-09-17'),
      editor: 'Supergiant Games',
      developer: 'Supergiant Games',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Hades es un juego brillantemente diseñado con una narrativa cautivadora. La jugabilidad es fluida, y cada muerte se siente como una lección para mejorar. Es adictivo y desafiante.',
        date: new Date('2020-10-01'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'El sistema de combate es uno de los mejores que he visto en un juego de este género. El juego te anima a probar diferentes estilos y habilidades, lo que hace que cada partida se sienta fresca y emocionante.',
        date: new Date('2021-01-20'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Visualmente, Hades es una obra de arte. Los gráficos y la banda sonora se complementan perfectamente, y la historia añade un toque emocional que rara vez se ve en juegos de este estilo.',
        date: new Date('2021-06-11'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'La dificultad está bien equilibrada, y aunque algunas veces puede ser frustrante, la sensación de progresar y desbloquear mejoras hace que valga la pena cada intento.',
        date: new Date('2022-03-08'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un juego excelente para los amantes de los rogue-likes. Es uno de esos títulos en los que puedes pasar cientos de horas sin darte cuenta. Muy recomendado.',
        date: new Date('2022-10-21'),
        userId: '5',
      },
    ],
  },
  {
    id: 'overcooked',
    title: 'Overcooked',
    image: '/assets/game/15.png',
    description:
      'Overcooked es un caótico juego de simulación de cocina desarrollado por Ghost Town Games. El juego permite a los jugadores colaborar en equipos para preparar, cocinar y servir platos en diferentes niveles temáticos, cada uno con su propio conjunto de desafíos y obstáculos. La comunicación y la cooperación son clave para superar las demandas de los clientes en el menor tiempo posible. Es un juego ideal para jugar en grupos y disfrutar de momentos de risas y estrés en la cocina.',
    rating: 8,
    detail: {
      summary: 'Overcooked',
      genre: ['Simulación', 'Multijugador', 'Cooperativo'],
      platforms: [
        'PC',
        'PS4',
        'PS5',
        'Nintendo Switch',
        'Xbox One',
        'Xbox Series X/S',
      ],
      releaseDate: new Date('2016-08-03'),
      editor: 'Team17',
      developer: 'Ghost Town Games',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Overcooked es el juego perfecto para jugar con amigos. La cooperación es crucial y genera momentos divertidísimos cuando todos intentan coordinarse en la cocina.',
        date: new Date('2017-05-11'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Aunque es un gran juego, puede llegar a ser estresante en niveles más avanzados. La falta de un modo historia más profundo le resta un poco de atractivo.',
        date: new Date('2018-02-18'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Visualmente encantador y caótico en el mejor sentido de la palabra. Cada nivel ofrece nuevos retos y mecánicas que hacen que el juego no se sienta repetitivo.',
        date: new Date('2018-10-30'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El juego es entretenido, pero la dificultad de algunos niveles puede resultar frustrante, especialmente si no cuentas con el equipo ideal de jugadores.',
        date: new Date('2019-06-14'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Jugar Overcooked en grupo es una experiencia única. Es fácil aprender los controles, pero difícil dominar el juego. Ideal para reuniones con amigos.',
        date: new Date('2020-08-22'),
        userId: '5',
      },
    ],
  },
  {
    id: 'genshin-impact',
    title: 'Genshin Impact',
    image: '/assets/game/16.png',
    description:
      'Genshin Impact es un RPG de mundo abierto desarrollado por miHoYo. El jugador explora el mundo de Teyvat, donde controla a personajes con habilidades elementales únicas. El juego combina exploración, combate y elementos de gacha para desbloquear personajes y armas. Con una narrativa rica y gráficos impresionantes, Genshin Impact ha ganado una gran base de jugadores en todo el mundo.',
    rating: 8,
    detail: {
      summary: 'Genshin Impact',
      genre: ['RPG', 'Mundo Abierto', 'Gacha'],
      platforms: ['PC', 'PS4', 'PS5', 'iOS', 'Android'],
      releaseDate: new Date('2020-09-28'),
      editor: 'miHoYo',
      developer: 'miHoYo',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Un juego visualmente impresionante con mecánicas de combate fluidas. La narrativa y el sistema de gacha lo hacen único, aunque el progreso puede ser lento sin gastar dinero.',
        date: new Date('2020-10-05'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La exploración y la música son sobresalientes. Sin embargo, el sistema de energía y los eventos de tiempo limitado pueden resultar frustrantes.',
        date: new Date('2021-01-20'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El juego tiene mucho contenido, pero la dependencia en el sistema de gacha puede ser desalentadora. Aun así, es adictivo y vale la pena probarlo.',
        date: new Date('2021-06-11'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Genshin Impact combina elementos de RPG y gacha de manera magistral. Cada personaje tiene su propia historia y habilidades únicas, lo que hace que el juego sea fresco.',
        date: new Date('2022-03-08'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un gran juego para aquellos que aman la exploración y la narrativa. Sin embargo, el aspecto gacha puede resultar un poco agresivo para algunos jugadores.',
        date: new Date('2022-10-21'),
        userId: '5',
      },
    ],
  },
  {
    id: 'the-last-of-us-part-II',
    title: 'The Last of Us Part II',
    image: '/assets/game/17.png',
    description:
      'The Last of Us Part II es un juego de acción y aventura desarrollado por Naughty Dog. La historia continúa con Ellie y Joel, explorando las complejidades de la venganza, la pérdida y la redención en un mundo postapocalíptico. El juego combina narrativa profunda con un sistema de combate brutal y realista. Es una experiencia intensa y emocional que se destaca tanto por su historia como por su jugabilidad.',
    rating: 9,
    detail: {
      summary: 'The Last of Us Part II',
      genre: ['Acción', 'Aventura', 'Narrativa'],
      platforms: ['PS4', 'PS5'],
      releaseDate: new Date('2020-06-19'),
      editor: 'Sony Interactive Entertainment',
      developer: 'Naughty Dog',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Una obra maestra narrativa. La historia de Ellie y Abby es impactante y conmovedora. El combate es visceral y la ambientación es asombrosa.',
        date: new Date('2020-06-22'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El juego tiene un enfoque muy oscuro. A algunos les encantará, pero a otros puede parecerles agotador emocionalmente. Aun así, la jugabilidad es impecable.',
        date: new Date('2020-08-14'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Cada detalle está pulido al máximo. La historia me dejó sin palabras y es uno de esos juegos que recordaré para siempre. Naughty Dog se ha superado.',
        date: new Date('2021-01-05'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La narrativa es polarizadora, pero no se puede negar que el juego es visualmente impresionante. Los personajes están bien desarrollados, pero algunas decisiones de la historia no me convencen.',
        date: new Date('2021-06-12'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Una experiencia intensa y emocional. La historia puede no gustarle a todos, pero el juego en sí es una obra de arte. Recomiendo jugarlo con la mente abierta.',
        date: new Date('2022-03-29'),
        userId: '5',
      },
    ],
  },
  {
    id: 'apex-legends',
    title: 'Apex Legends',
    image: '/assets/game/18.png',
    description:
      'Apex Legends es un shooter de estilo Battle Royale desarrollado por Respawn Entertainment. Los jugadores forman escuadrones de tres y compiten en una arena donde deben ser el último equipo en pie. Cada personaje, conocido como "Leyenda", tiene habilidades únicas que complementan diferentes estilos de juego. Con una jugabilidad fluida y un enfoque en el trabajo en equipo, Apex Legends se ha posicionado como uno de los juegos más populares de su género.',
    rating: 8,
    detail: {
      summary: 'Apex Legends',
      genre: ['Battle Royale', 'FPS'],
      platforms: [
        'PC',
        'PS4',
        'PS5',
        'Xbox One',
        'Xbox Series X/S',
        'Nintendo Switch',
      ],
      releaseDate: new Date('2019-02-04'),
      editor: 'Electronic Arts',
      developer: 'Respawn Entertainment',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un Battle Royale fresco y dinámico. Las habilidades de cada Leyenda añaden un nivel de estrategia único que lo diferencia de otros juegos del género.',
        date: new Date('2019-03-22'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El juego es adictivo y tiene un excelente diseño de personajes, pero algunas temporadas se sienten desbalanceadas. Aun así, sigue siendo muy entretenido.',
        date: new Date('2020-07-15'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La curva de aprendizaje es alta, y el juego puede ser implacable para los nuevos jugadores. Una vez que te adaptas, la experiencia es muy satisfactoria.',
        date: new Date('2021-08-10'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Me encanta la fluidez del movimiento y la jugabilidad rápida. El trabajo en equipo es esencial para ganar, lo que lo hace perfecto para jugar con amigos.',
        date: new Date('2022-01-05'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Un buen juego, pero las microtransacciones y la falta de contenido nuevo le restan un poco de valor a largo plazo.',
        date: new Date('2022-09-18'),
        userId: '5',
      },
    ],
  },
  {
    id: 'call-of-duty-warzone',
    title: 'Call of Duty: Warzone',
    image: '/assets/game/19.png',
    description:
      'Call of Duty: Warzone es un Battle Royale desarrollado por Infinity Ward y Raven Software. Ofrece partidas multijugador con hasta 150 jugadores, donde la acción y la estrategia se combinan para ser el último en pie. Con el clásico estilo de juego de Call of Duty, Warzone añade mecánicas únicas como el Gulag y contratos que otorgan recompensas especiales durante la partida.',
    rating: 8,
    detail: {
      summary: 'Call of Duty: Warzone',
      genre: ['Battle Royale', 'FPS'],
      platforms: ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X/S'],
      releaseDate: new Date('2020-03-10'),
      editor: 'Activision',
      developer: 'Infinity Ward, Raven Software',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Warzone es uno de los mejores Battle Royales. La acción es constante, y las mecánicas de reaparición y contratos lo hacen único en su género.',
        date: new Date('2020-04-02'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El juego es genial, pero las actualizaciones pueden ser problemáticas. A veces se siente que algunos parches rompen el balance del juego.',
        date: new Date('2020-08-22'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un gran juego para quienes buscan acción rápida y un Battle Royale con un enfoque en la puntería. Sin embargo, algunos errores técnicos pueden afectar la experiencia.',
        date: new Date('2021-01-15'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La jugabilidad es buena, pero las microtransacciones y la falta de un sistema de antitrampas efectivo le restan valor.',
        date: new Date('2021-06-20'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un gran Battle Royale con elementos únicos. Es ideal para los fans de Call of Duty que buscan un enfoque diferente en el género.',
        date: new Date('2022-10-12'),
        userId: '5',
      },
    ],
  },
  {
    id: 'dark-souls-III',
    title: 'Dark Souls III',
    image: '/assets/game/20.png',
    description:
      'Dark Souls III es un RPG de acción desarrollado por FromSoftware. El juego lleva a los jugadores a un mundo oscuro y desolado donde deben enfrentar a enemigos implacables y jefes desafiantes. Con su característico sistema de combate, Dark Souls III se destaca por su dificultad y su atmósfera sombría. Es el último título de la trilogía y concluye la historia de una manera épica.',
    rating: 9,
    detail: {
      summary: 'Dark Souls III',
      genre: ['RPG', 'Acción', 'Difícil'],
      platforms: ['PC', 'PS4', 'Xbox One'],
      releaseDate: new Date('2016-03-24'),
      editor: 'Bandai Namco Entertainment',
      developer: 'FromSoftware',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Un cierre épico para la trilogía. La dificultad es brutal, pero cada victoria se siente como un logro. Visualmente impresionante y con un diseño de niveles increíble.',
        date: new Date('2016-04-10'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La curva de dificultad puede ser frustrante para los nuevos jugadores, pero para los fans de la serie, es un juego imprescindible.',
        date: new Date('2017-01-05'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'El diseño de enemigos y jefes es de lo mejor que he visto. La atmósfera y la narrativa ambiental son excepcionales.',
        date: new Date('2018-03-15'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un gran juego, pero la falta de una historia más clara puede ser un problema para algunos. Aun así, es un título que desafía y recompensa.',
        date: new Date('2019-06-12'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Dark Souls III es un juego para quienes buscan un verdadero reto. La jugabilidad y el diseño de niveles son sobresalientes, y la ambientación es insuperable.',
        date: new Date('2020-10-21'),
        userId: '5',
      },
    ],
  },
];
